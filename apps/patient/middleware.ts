
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export default async function middleware(request: NextRequest) {

    const token = await getToken({ req: request })
    const url = new URL(request.url)

    if (token && url.pathname === '/') {
        return NextResponse.redirect(new URL('/verify', request.url))
    } else if (!token &&
        (url.pathname === '/dashboard' ||
            url.pathname === '/appointments' ||
            url.pathname === '/history' ||
            url.pathname === '/verify'
        )) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', '/dashboard', '/verify', '/appointments', '/history']
};