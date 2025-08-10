'use client';
import { Card, Input, Button, message } from 'antd';
import { useUser } from '@auth0/nextjs-auth0/client';
import useGeolocation from '../../hooks/useGeolocation';
import { useState } from 'react';

export default function ClockPage(){
  const { user } = useUser();
  const { coords, error } = useGeolocation();
  const [note, setNote] = useState('');
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  async function getApiToken(){
    const r = await fetch('/api/auth/token');
    if (!r.ok) throw new Error('Failed to get token');
    return r.text();
  }

  async function doClock(type){
    if (!coords) { message.error('Location required'); return; }
    try {
      const token = await getApiToken();
      const mutation = `
        mutation($locationId:Int!,$lat:Float!,$lng:Float!,$note:String){
          ${type}(locationId:$locationId, lat:$lat, lng:$lng, note:$note) {
            id type timestamp location { name }
          }
        }
      `;
      const res = await fetch(backendUrl, {
        method:'POST',
        headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
        body: JSON.stringify({ query:mutation, variables:{ locationId:1, lat:coords.lat, lng:coords.lng, note } })
      });
      const json = await res.json();
      if (json.errors) throw new Error(json.errors[0].message);
      message.success(`${type} successful`);
    } catch(err){
      message.error(err.message || 'Clock failed');
    }
  }

  if (!user) return <Card style={{maxWidth:600,margin:'40px auto'}}>Please log in to use clock.</Card>;

  return (
    <Card title="Clock In / Out" style={{maxWidth:600,margin:'24px auto'}}>
      <p><strong>Your location:</strong> {coords ? `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}` : (error || 'Fetching...')}</p>
      <Input.TextArea rows={3} placeholder="Optional note" value={note} onChange={e=>setNote(e.target.value)} />
      <div style={{display:'flex',gap:12,marginTop:12}}>
        <Button type="primary" onClick={()=>doClock('clockIn')}>Clock In</Button>
        <Button danger onClick={()=>doClock('clockOut')}>Clock Out</Button>
      </div>
    </Card>
  );
}
