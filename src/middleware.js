import { NextRequest, NextResponse } from "next/server";

export function middleware(NextRequest) {
    const path = NextRequest.nextUrl.pathname;
    // console.log('Middleware executed for path:', path);

    // Public paths (accessible without authentication)
    const isPublicPath = path === '/login' || path === '/register';

    // Get token and isAdmin from cookies
    const token = NextRequest.cookies.get('token')?.value || '';
    const isAdmin = NextRequest.cookies.get('isAdmin').value === 'true'; // Compare as string

    // console.log('Token:', token);
    // console.log('isAdmin:', isAdmin);

    // Admin routes
    const adminRoutes = [
        '/admin/users',
        '/admin/product',
        '/api/admin/product',
        '/api/admin/users/getuser',
    ];

    // Redirect if user is logged in and tries to access public paths
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', NextRequest.nextUrl));
    }

    // Redirect if user is not authenticated and tries to access protected routes
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', NextRequest.nextUrl));
    }

    // Redirect if a normal user tries to access admin routes
    if (adminRoutes.includes(path) && isAdmin !== true) {
        console.log('Access denied to admin route:', path);
        return NextResponse.redirect(new URL('/', NextRequest.nextUrl)); // Redirect to home
    }

    // Allow the request to continue
    return NextResponse.next();
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
        "/api/payment",
        '/api/product:path*',
        '/api/saveorder:path*',
        '/admin/:path*', // Ensure this matches your admin routes
        '/api/admin/:path*' // Include admin API routes in matcher
    ]
}
