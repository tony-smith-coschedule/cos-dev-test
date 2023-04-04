import { NextRequest, NextResponse } from 'next/server';
import { giphyTrending } from '../utils';

export async function GET(request: NextRequest) {
  try {
    const page = Number(request.nextUrl.searchParams.get('page')) ?? 0;
    const trendingGifs = await giphyTrending(10, page);
    return NextResponse.json(trendingGifs);
  } catch (err) {
    console.log(`Giphy Search Error: ${err}`);
    return new NextResponse(JSON.stringify({ error: 'Cannot search gifs' }), {
      status: 404
    });
  }
}
