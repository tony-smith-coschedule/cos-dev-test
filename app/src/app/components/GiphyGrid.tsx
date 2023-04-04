'use client';

import { Grid } from '@giphy/react-components';
import { useEffect, useState } from 'react';

export default function GiphyGrid(props) {
  const [isSearchMode, setIsSearchMode] = useState(false);
  useEffect(() => {
    setIsSearchMode(!!props.searchString);
  }, [props.searchString]);
  // Overrides giphy grid's default behavior
  const onGifClick = (gif: any, e: any) => {
    e.preventDefault();
    window.location.href = `/gif/${gif.id}`;
  };

  // GiphyGrid gets its own component because I override a lot of behavior and want to compartmentalize it
  const fetchGifs = async (offset: number) => {
    const apiUrl = isSearchMode
      ? `/api/giphy/search/${props.searchString}?page=${offset}`
      : `/api/giphy/trending?page=${offset}`;
    const response = await fetch(apiUrl);
    return response.json();
  };

  // Generate a unique key based on the search string to force a re-render on search
  const key = props.searchString
    ? props.searchString + isSearchMode
    : 'trending';

  return (
    <>
      <Grid
        key={key}
        width={1200}
        columns={3}
        fetchGifs={fetchGifs}
        onGifClick={onGifClick}
        noLink={true}
      />
    </>
  );
}
