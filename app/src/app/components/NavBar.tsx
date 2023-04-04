'use client';

import Image from 'next/image';
import Link from 'next/link';
import giphyLogo from '../../../public/giphy-logo.gif';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  return (
    <div>
      <Image src={giphyLogo} alt="Giphy Logo" width={200} />
      <nav>
        <Link href="/">Home</Link>
        <br />
        {loggedIn ? (
          <p>You're logged in!</p>
        ) : (
          <Link href="/login">Log In to Comment and Rate Gifs</Link>
        )}
      </nav>
    </div>
  );
}
