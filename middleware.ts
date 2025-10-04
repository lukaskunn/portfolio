import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(_request: NextRequest) {
    // Add any custom middleware logic here
    // The redirect from '/' to '/home' is handled in next.config.js
    return NextResponse.next();
}