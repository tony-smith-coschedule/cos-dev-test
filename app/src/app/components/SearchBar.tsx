'use client';

import { useRef } from 'react';

export default function SearchBar(props: any) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    props.onSearch(inputRef.current?.value ?? '');
  };

  return (
    <div>
      <input placeholder="Giphy Search" ref={inputRef} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
