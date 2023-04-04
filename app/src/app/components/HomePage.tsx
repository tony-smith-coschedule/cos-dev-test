'use client';

import GiphyGrid from './GiphyGrid';
import SearchBar from './SearchBar';
import { useState } from 'react';

export default function HomePage() {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (input: string) => {
    setSearchInput(input);
  };
  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <GiphyGrid searchString={searchInput} />
    </>
  );
}
