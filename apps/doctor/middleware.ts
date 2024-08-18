
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const config = {
    matcher: ['/dashboard/:path*', '/signin', '/', '/signup', '/edit/:path*', '/history', '/reset'],
};

export default async function middleware(request: NextRequest) {

    const token = await getToken({ req: request });
    const url = request.nextUrl;

    if (
        token &&
        (url.pathname.startsWith('/signin') ||
            url.pathname.startsWith('/signup')) ||
        url.pathname.startsWith('/reset')
    ) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (
        !token &&
        (url.pathname.startsWith('/dashboard') ||
            url.pathname === '/' ||
            url.pathname.startsWith('/edit') ||
            url.pathname === '/history')
    ) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }

    return NextResponse.next();
}