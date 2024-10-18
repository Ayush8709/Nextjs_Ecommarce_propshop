import { NextRequest, NextResponse } from "next/server";


export function middleware(NextRequest) {
    const path = NextRequest.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/register' 

    const token = NextRequest.cookies.get('token')?.value || ''



    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', NextRequest.nextUrl))
    }


    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', NextRequest.nextUrl))
    }
}

export const config = {
    matcher: [
        '/',
        '/login',
        '/register',
        '/cart',
        '/form',
        '/payment',
        '/profile',
        '/setting',
        '/placeorder',
        '/api/auth/me',
        '/api/auth/update',
        '/api/auth/logout',
        "/api/paymnet",
        '/api/product:path*',
        '/api/saveorder:path*'
    ]
}