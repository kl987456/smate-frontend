export const dynamic = "force-dynamic";

import { getAccessToken } from "@auth0/nextjs-auth0";

export async function GET(req) {
  try {
    const { accessToken } = await getAccessToken(req, { refresh: false });
    if (!accessToken) {
      return new Response("UNAUTHORIZED", { status: 401 });
    }
    return new Response(accessToken, { status: 200 });
  } catch (err) {
    console.error("token route error", err);
    return new Response("ERROR", { status: 500 });
  }
}
