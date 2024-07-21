
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(request: NextRequest) {

    const token = await getToken({ req: request })
    const url = new URL(request.url)

    if (token && url.pathname === '/api/auth/signin') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    // else if (!token &&
    //     (url.pathname.startsWith('/dashboard') ||
    //         url.pathname.startsWith('/') ||
    //         url.pathname.startsWith('/verify'))) {
    //     return NextResponse.redirect(new URL('/api/auth/signin', request.url))
    // }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/dashboard', '/api/auth/signin', '/verify']
};