'use client';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from 'antd';

export default function Navbar() {
  const { user } = useUser();

  return (
    <header style={{background:'#001529',padding:'12px 20px',color:'#fff'}}>
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <Link href="/"><strong style={{color:'#fff',fontSize:18}}>SMATE</strong></Link>
        <nav style={{display:'flex',gap:12,alignItems:'center'}}>
          <Link href="/clock"><span style={{color:'#fff'}}>Clock</span></Link>
          <Link href="/dashboard"><span style={{color:'#fff'}}>Dashboard</span></Link>
          {user ? (
            <>
              <span style={{color:'#fff',marginLeft:8}}>{user.name || user.email}</span>
              <Button type="primary" danger size="small" href="/api/auth/logout">Logout</Button>
            </>
          ) : (
            <Button type="primary" size="small" href="/api/auth/login">Login</Button>
          )}
        </nav>
      </div>
    </header>
  );
}
