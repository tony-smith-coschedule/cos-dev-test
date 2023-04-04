import { authCheck } from '@/app/api/util/auth';
import { NextRequest, NextResponse } from 'next/server';
import { upsertRating } from '@/app/api/util/gifUtils';

export async function POST(request: NextRequest, { params }) {
  // New Next doesn't have a great process for middleware that I've found so this is a standin for that
  const { auth, message, id: userId, email, iat } = authCheck(request);
  if (auth) {
    const { rating } = await request.json();
    return NextResponse.json(await upsertRating(params.id, userId, rating));
  }
  return new NextResponse(
    JSON.stringify({
      message
    }),
    {
      status: 400
    }
  );
}
