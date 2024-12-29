// utils/cors.ts
import { NextResponse } from 'next/server';

export function cors(req: Request) {
  const allowedOrigins = ['https://seminar-hall-booking-five.vercel.app']; // List of allowed origins

  const origin = req.headers.get('Origin');
  if (origin && allowedOrigins.includes(origin)) {
    return NextResponse.next();
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}
