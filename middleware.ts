import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  // Allow login page to be accessed
  if (isLoginPage) {
    return NextResponse.next();
  }

  // For protected admin routes, we let the client-side useAdmin hook handle auth
  // This middleware is a basic setup - real auth happens client-side with Firebase
  if (isAdminRoute && !isLoginPage) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
