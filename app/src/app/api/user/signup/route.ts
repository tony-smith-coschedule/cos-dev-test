import { NextRequest, NextResponse } from 'next/server';
import { createNewUser } from '../utils';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  if (typeof email === 'string' && typeof password === 'string') {
    try {
      const token = await createNewUser(email, password);
      return NextResponse.json({ token });
    } catch (err) {
      console.log(`Could not create user: ${err}`);
      return new NextResponse(JSON.stringify({ error: 'Cannot create user' }), {
        status: 400
      });
    }
  } else {
    return new NextResponse(JSON.stringify({ error: 'Cannot create user' }), {
      status: 400
    });
  }
}
