import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const action = url.searchParams.get('action')
  
  if (action === 'signin') {
  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', process.env.GOOGLE_CLIENT_ID!);
  authUrl.searchParams.set(
    'redirect_uri',
    `${process.env.NEXTAUTH_URL}/api/simple-auth?action=callback`
  );
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', 'openid email profile');

  return NextResponse.redirect(authUrl.toString());
}
  
  if (action === 'callback') {
  const code = url.searchParams.get('code');
  if (!code) {
    return NextResponse.redirect(new URL('/login?error=NoCode', request.url));
  }

  const redirectUri = `${process.env.NEXTAUTH_URL}/api/simple-auth?action=callback`;

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  });

  const tokens = await tokenResponse.json();

  if (!tokenResponse.ok || !tokens.access_token) {
    console.error('Token exchange failed:', tokens);
    return NextResponse.redirect(new URL('/login?error=TokenFailed', request.url));
  }

  const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${tokens.access_token}` },
  });

  const user = await userResponse.json();

  // Set session
  const cookieStore = await cookies();
  cookieStore.set('simple-session', JSON.stringify({
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.picture,
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
    path: '/', // wichtig: Cookie überall verfügbar
  });

  return NextResponse.redirect(new URL('/dashboard', request.url));
}
  
  if (action === 'signout') {
    const cookieStore = await cookies()
    cookieStore.delete('simple-session')
    return NextResponse.redirect(new URL('/', request.url))
  }
  
  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}