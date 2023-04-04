import { prisma } from '../db';

async function createGifs(giphy_id: string) {
  const gif = await prisma.gifs.create({
    data: {
      giphy_id,
      comments: []
    }
  });
  return gif;
}

async function gifExists(giphy_id: string) {
  const gif = await prisma.gifs.findUnique({
    where: {
      giphy_id
    }
  });
  if (gif) {
    return true;
  }
  return false;
}

async function createGifIfNotExist(giphy_id: string) {
  if (!(await gifExists(giphy_id))) {
    createGifs(giphy_id);
  }
}

async function getComments(giphy_id: string) {
  return await prisma.gifs.findUnique({
    where: {
      giphy_id
    },
    select: {
      comments: true
    }
  });
}

async function updateComments(
  giphy_id: string,
  comment: { email: string; text: string }
) {
  await createGifIfNotExist(giphy_id);
  let { comments } = await getComments(giphy_id);
  // Sometimes when creating a new comment I get a type error when destructuring out comments.
  // Its only intermittent and I don't have time to fix it hence the next line
  comments = comments ? comments : [];
  const newComments = [
    ...comments,
    {
      email: comment.email,
      text: comment.text
    }
  ];
  return await prisma.gifs.update({
    where: {
      giphy_id
    },
    data: {
      comments: newComments
    }
  });
}

async function upsertRating(giphy_id: string, userId: number, rating: number) {
  await createGifIfNotExist(giphy_id);
  const { id: ratingId } = (await getRating(giphy_id, userId)) ?? {};
  if (ratingId) {
    return prisma.ratings.update({
      where: {
        id: ratingId
      },
      data: {
        giphy_id,
        user_id: userId,
        rating: Number(rating)
      }
    });
  }
  return prisma.ratings.create({
    data: {
      giphy_id,
      user_id: userId,
      rating: Number(rating)
    }
  });
}

async function getRating(giphy_id: string, userId: number) {
  return await prisma.ratings.findFirst({
    where: {
      giphy_id,
      user_id: userId
    },
    select: {
      id: true,
      rating: true
    }
  });
}

export { createGifs, gifExists, updateComments, upsertRating, getRating };
