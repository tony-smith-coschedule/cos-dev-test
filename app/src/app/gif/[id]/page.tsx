'use client';
import { Gif } from '@giphy/react-components';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useAsync } from 'react-async-hook';
import { useRouter } from 'next/router';

export default function GifPage({ params }) {
  const gif = useAsync(fetchGif, [params.id]);
  const [loggedIn, setLoggedIn] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const ratingRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const handleComment = async (event) => {
    event.preventDefault();
    const newComment = inputRef.current?.value ?? '';
    await postComment(params.id, newComment);
    window.location.reload();
  };

  const handleRatingChange = async (event) => {
    event.preventDefault();
    const ratingValue = ratingRef.current?.value ?? 'null';
    await updateRating(params.id, ratingValue);
    window.location.reload();
  };

  return (
    <div>
      {gif.loading && <div>Loading</div>}
      {gif.error && <div>Error: {gif.error.message}</div>}
      {gif.result && (
        <>
          <div>
            <Gif gif={gif.result} width={300} />
            <h1>{gif.result.title}</h1>
            <button
              onClick={() => {
                navigator.clipboard.writeText(gif.result.url);
              }}
            >
              Copy Link to Clipboard
            </button>
            <br />
            <button
              onClick={() => {
                navigator.clipboard.writeText(gif.result.embed_url);
              }}
            >
              Copy Embed Url
            </button>
            <p>
              Rating: {gif.result.rating}
              <br />
              Type: {gif.result.type}
              <br />
              Average Rating: {gif.result.average_rating ?? '0'}{' '}
              {loggedIn ? (
                <>
                  / Your Rating:
                  <select
                    onChange={handleRatingChange}
                    ref={ratingRef}
                    value={gif.result.user_rating}
                  >
                    <option value="null">No Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>{' '}
                </>
              ) : (
                <></>
              )}
            </p>
          </div>
          <span>Comments</span>
          {gif.result.comments?.length === 0 ||
          gif.result.comments === undefined ? (
            <p>There are no comments on this gif</p>
          ) : (
            <div>
              {gif.result.comments.map((comment, index) => {
                return (
                  <div key={index} className="simple-ext-info">
                    <label>User: {comment.email}</label>
                    <p>{comment.text}</p>
                  </div>
                );
              })}
            </div>
          )}
          {loggedIn ? (
            <div>
              <label>Add Your Comment</label>
              <br />
              <textarea rows={4} cols={40} ref={inputRef}></textarea>
              <br />
              <button onClick={handleComment}>Add Comment</button>
            </div>
          ) : (
            <p>
              <Link href="/login">Log in</Link> to comment
            </p>
          )}
        </>
      )}
    </div>
  );
}

async function fetchGif(id: string) {
  const giphyResponse = await fetch(`http://localhost:3000/api/giphy/${id}`);
  const extraDataResponse = await fetch(`http://localhost:3000/api/gifs/${id}`);
  const { data: giphyData } = await giphyResponse.json();
  const extraData = await extraDataResponse.json();
  return {
    ...giphyData,
    comments: extraData.comments,
    average_rating: extraData.averageRating,
    user_rating: extraData.userRating
  };
}

async function postComment(id: string, comment: string) {
  console.log('Button press triggering');
  const commentResponse = await fetch(
    `http://localhost:3000/api/gifs/${id}/comment`,
    {
      method: 'POST',
      body: JSON.stringify({
        comment
      })
    }
  );
}

async function updateRating(id: string, rating: string) {
  const ratingResponse = await fetch(
    `http://localhost:3000/api/gifs/${id}/rate`,
    {
      method: 'POST',
      body: JSON.stringify({
        rating
      })
    }
  );
}
