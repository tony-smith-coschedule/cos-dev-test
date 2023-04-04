import { authCheck } from '@/app/api/util/auth';
import { updateComments } from '@/app/api/util/gifUtils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, { params }) {
  // New Next doesn't have a great process for middleware that I've found so this is a standin for that
  const { auth, message, id, email, iat } = authCheck(request);
  if (auth) {
    const { comment } = await request.json();
    if (comment.length) {
      return NextResponse.json(
        await updateComments(params.id, { email, text: comment })
      );
    }
    return new NextResponse(
      JSON.stringify({
        error: 'No content in your comment. Rejected.'
      })
    );
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
