// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  let verifyCookie = req.cookies.get('isLogin')?.value;
  if (verifyCookie) {
    let verify = parseInt(verifyCookie);
    if (!verify && req.url.includes('/restaurant/edit')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
}
