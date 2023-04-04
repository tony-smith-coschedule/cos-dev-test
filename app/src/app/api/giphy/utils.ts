import { GiphyFetch } from '@giphy/js-fetch-api';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// All the giphy stuff is consolidated to one file so that the API key can be protected.
// although it looks like they expose their api key on their own front end so
// I don't think its an actual security concern to them.
const giphyKey = process.env.GIPHY_API_KEY ?? '';
const giphy = new GiphyFetch(giphyKey);

async function giphyTrending(limit: number, offset: number) {
  try {
    return giphy.trending({ offset, limit });
  } catch (err) {
    console.log(err);
  }
}

async function giphySearch(
  searchString: string,
  limit: number,
  offset: number
) {
  try {
    return giphy.search(searchString, {
      sort: 'relevant',
      lang: 'en',
      limit,
      offset
    });
  } catch (err) {
    console.log(err);
  }
}

async function giphyGetById(id: string) {
  try {
    return giphy.gif(id);
  } catch (err) {
    console.log(err);
  }
}

export { giphyTrending, giphySearch, giphyGetById };
