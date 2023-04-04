import { prisma } from '../../db';
import { NextRequest, NextResponse } from 'next/server';
import { getRating } from '../../util/gifUtils';
import { authCheck } from '../../util/auth';

// Gets supplemental data for a gif from the db
export async function GET(request: NextRequest, { params }: { params: any }) {
  try {
    const gifData = await prisma.gifs.findFirst({
      where: {
        giphy_id: params.id
      }
    });
    // If a gif record exists, calculate rating
    let averageRating;
    let userRating;
    if (gifData) {
      const { _avg } = await prisma.ratings.aggregate({
        where: {
          giphy_id: params.id
        },
        // Have SQL calculate average because javascript is dog shit at it
        _avg: {
          rating: true
        }
      });
      averageRating = _avg.rating;
      // If gif exists, check if existing user has rated it.
      const { id: userId } = await authCheck(request);
      const { rating } = (await getRating(params.id, userId)) ?? {};
      userRating = rating;
    }
    return NextResponse.json({
      ...gifData,
      averageRating,
      userRating
    });
  } catch (err) {
    console.log(`Could not get supplemental Gif data: ${err}`);
  }
}
