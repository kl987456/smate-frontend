'use client';
import { Card, Input, Button, message } from 'antd';
import useGeolocation from '../hooks/useGeolocation';
import { useState } from 'react';

export default function ClockForm({ onDone }) {
  const { coords } = useGeolocation();
  const [note, setNote] = useState('');
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  async function getToken(){ const r = await fetch('/api/auth/token'); return r.ok ? r.text() : null; }

  async function handle(type){
    if (!coords) return message.error('Location not available');
    const token = await getToken();
    if (!token) return message.error('Not authenticated');
    const mutation = `mutation($locationId:Int!,$lat:Float!,$lng:Float!,$note:String){ ${type}(locationId:$locationId,lat:$lat,lng:$lng,note:$note){ id } }`;
    const res = await fetch(backendUrl, {
      method:'POST',
      headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
      body: JSON.stringify({ query:mutation, variables:{ locationId:1, lat:coords.lat, lng:coords.lng, note }})
    });
    const json = await res.json();
    if (json.errors) return message.error(json.errors[0].message);
    message.success(`${type} success`);
    onDone && onDone();
  }

  return (
    <Card>
      <Input.TextArea rows={3} placeholder="Optional note" value={note} onChange={e=>setNote(e.target.value)} />
      <div style={{display:'flex',gap:12,marginTop:12}}>
        <Button type="primary" onClick={()=>handle('clockIn')}>Clock In</Button>
        <Button danger onClick={()=>handle('clockOut')}>Clock Out</Button>
      </div>
    </Card>
  );
}
