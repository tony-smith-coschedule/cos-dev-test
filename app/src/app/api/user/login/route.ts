import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '../utils';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  if (typeof email === 'string' && typeof password === 'string') {
    try {
      const token = await signIn(email, password);
      return NextResponse.json({ token });
    } catch (err) {
      console.log('Could not sign in user');
      return new NextResponse(
        JSON.stringify({
          error: 'Could not log in'
        }),
        {
          status: 400
        }
      );
    }
  }
}
