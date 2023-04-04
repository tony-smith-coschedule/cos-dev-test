import { NextRequest, NextResponse } from 'next/server';
import { giphyGetById } from '../utils';

export async function GET(_request: NextRequest, { params }: { params: any }) {
  try {
    const gif = await giphyGetById(params.id);
    return NextResponse.json(gif);
  } catch (err) {
    console.log(`Giphy Get By Id Error: ${err}`);
    return new NextResponse(JSON.stringify({ error: 'Cannot get gif' }), {
      status: 404
    });
  }
}
