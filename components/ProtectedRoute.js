'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Spin } from 'antd';

export default function ProtectedRoute({ children }) {
  const { user, isLoading } = useUser();
  if (isLoading) return <div style={{textAlign:'center',padding:40}}><Spin /></div>;
  if (!user) return <div style={{textAlign:'center',padding:40}}>Please <a href="/api/auth/login">login</a>.</div>;
  return children;
}
