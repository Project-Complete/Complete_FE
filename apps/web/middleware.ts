import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const nextUrl = request.nextUrl
    const access_token = nextUrl.searchParams.get('access_token');
    const refresh_token = nextUrl.searchParams.get('refresh_token');

    const response = NextResponse.redirect(new URL('/', request.url)) //
    if (access_token) {
        response.cookies.set({
            name: 'access_token',
            value: access_token,
            path: '/',
        })
    }
    if (refresh_token) {
        response.cookies.set({
            name: 'refresh_token',
            value: refresh_token,
            path: '/',
        })
    }
    return response;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/oauth2/redirect',
}