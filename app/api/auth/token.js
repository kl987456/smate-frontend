// pages/api/auth/token.js
import { getAccessToken } from '@auth0/nextjs-auth0';

export default async function handler(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    if (!accessToken) return res.status(401).send('UNAUTHORIZED');
    res.status(200).send(accessToken);
  } catch (err) {
    console.error('token route error', err);
    res.status(500).send('ERROR');
  }
}
