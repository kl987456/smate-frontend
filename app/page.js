'use client';
import { Button } from 'antd';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Landing() {
  const { user } = useUser();

  return (
    <div className="container">
      <div className="header-hero">
        <div className="hero-text" style={{flex:1}}>
          <h1>SMATE — Attendance for Care Teams</h1>
          <p>Geofence-enabled clock in/out, manager dashboard, and weekly reports — built for healthcare.</p>
          <div style={{marginTop:16}}>
            {user ? (
              <Button type="primary" size="large" href="/dashboard">Open Dashboard</Button>
            ) : (
              <Button type="primary" size="large" href="/api/auth/login">Get Started — Login</Button>
            )}
          </div>
        </div>
        <div style={{width:360}}>
          <img src="/hero-bg.jpg" alt="hero" style={{width:'100%',borderRadius:12,objectFit:'cover'}}/>
        </div>
      </div>

      <section style={{display:'grid',gridTemplateColumns:'1fr 1fr', gap:16}}>
        <div style={{background:'#fff',padding:20,borderRadius:10}}>
          <h3>Care Workers</h3>
          <p>Clock in/out when you arrive. Notes, location used for validation.</p>
          <Button href="/clock" type="primary">Clock Page</Button>
        </div>
        <div style={{background:'#fff',padding:20,borderRadius:10}}>
          <h3>Managers</h3>
          <p>View who is clocked in, when and where, and weekly analytics.</p>
          <Button href="/dashboard" type="primary">Manager Dashboard</Button>
        </div>
      </section>
    </div>
  );
}
