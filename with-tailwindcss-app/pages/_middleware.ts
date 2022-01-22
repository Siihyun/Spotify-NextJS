import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: any) {
  // middleware will run on every routing between pages
  const token = await getToken({ req, secret: process.env.JWT_SECRET! });
  const { pathname } = req.nextUrl;

  // Redirect to main if user already has valid token...
  if (token && pathname.includes('login')) {
    return NextResponse.redirect('/');
  }

  // Allow the requests if the following is true...
  // 1) Its a request for next-auth session & provider fetching
  // 2) the token exists

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // Redirect them to login if the don't have token AND are requesting a protected route
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login');
  }
}
