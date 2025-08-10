'use client';
import { Card, Table } from 'antd';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';

export default function Dashboard(){
  const { user } = useUser();
  const [staff, setStaff] = useState([]);
  const [reports, setReports] = useState(null);

  useEffect(()=>{
    async function load(){
      try {
        const tokenRes = await fetch('/api/auth/token');
        const token = await tokenRes.text();
        const query = `query { staffClockedIn { id user { name email } timestamp location { name } } reports { avgHoursPerDay peoplePerDay totalHoursPerStaff { name hours } } }`;
        const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL, {
          method:'POST',
          headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
          body: JSON.stringify({ query })
        });
        const json = await res.json();
        setStaff(json.data.staffClockedIn || []);
        setReports(json.data.reports || null);
      } catch(err){
        console.error(err);
      }
    }
    load();
  }, []);

  if (!user) return <Card>Please log in as manager</Card>;

  return (
    <div className="container">
      <Card title="Staff Currently Clocked In">
        <Table dataSource={staff} rowKey="id" columns={[
          { title:'Name', dataIndex:['user','name'], key:'name' },
          { title:'Email', dataIndex:['user','email'], key:'email' },
          { title:'Location', dataIndex:['location','name'], key:'loc' },
          { title:'Time In', dataIndex:'timestamp', key:'t' }
        ]} />
      </Card>

      {reports && (
        <Card title="Reports" style={{marginTop:16}}>
          <p>Avg hours/day: {reports.avgHoursPerDay}</p>
          <p>Unique people (week): {reports.peoplePerDay}</p>
          <h4>Total hours per staff (7d)</h4>
          <ul>
            {reports.totalHoursPerStaff.map((s, idx)=>(<li key={idx}>{s.name}: {s.hours} h</li>))}
          </ul>
        </Card>
      )}
    </div>
  );
}
