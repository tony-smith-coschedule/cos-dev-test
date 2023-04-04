import { NextRequest, NextResponse } from 'next/server';
import { giphySearch } from '../../utils';

export async function GET(request: NextRequest, { params }: { params: any }) {
  try {
    const page = Number(request.nextUrl.searchParams.get('page')) ?? 0;
    const searchGifs = await giphySearch(params.search, 10, page);
    return NextResponse.json(searchGifs);
  } catch (err) {
    console.log(`Giphy Search Error: ${err}`);
    return new NextResponse(JSON.stringify({ error: 'Cannot search gifs' }), {
      status: 404
    });
  }
}
