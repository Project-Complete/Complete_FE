import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const referer = request.headers.get('referer');

  if (request.nextUrl.pathname.startsWith('/login')) {
    const response = NextResponse.next();
    response.cookies.set({
      name: 'redirect_uri',
      value: referer ?? '/',
      path: '/',
    });
    return response;
  } else if (request.nextUrl.pathname.startsWith('/oauth2/redirect')) {
    const nextUrl = request.nextUrl;
    const access_token = nextUrl.searchParams.get('access_token');
    const refresh_token = nextUrl.searchParams.get('refresh_token');
    const redirect_uri = nextUrl.searchParams.get('redirect_uri');
    const newUrlString = new URL(redirect_uri ?? '/');
    const response = NextResponse.redirect(newUrlString);
    if (access_token) {
      response.cookies.set({
        name: 'access_token',
        value: access_token,
        path: '/',
      });
    }
    if (refresh_token) {
      response.cookies.set({
        name: 'refresh_token',
        value: refresh_token,
        path: '/',
      });
    }
    return response;
  } else if (request.nextUrl.pathname.startsWith('/oauth2/authorization/')) {
    const nextUrl = request.nextUrl;
    const redirect_uri = request.cookies.get('redirect_uri')?.value;
    const newUrlString = new URL(
      (process.env.NEXT_PUBLIC_BACKEND_URL ?? '/') + nextUrl.pathname,
    );
    newUrlString.searchParams.set('redirect_uri', redirect_uri ?? '/');
    const response = NextResponse.redirect(newUrlString); //
    return response;
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/oauth2/redirect', '/login', '/oauth2/authorization/:loginType*'],
};
