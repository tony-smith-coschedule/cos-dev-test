'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(undefined);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { token } = await fetchToken(email, password);
    if (typeof token === 'undefined') {
      setError('Cannot sign up');
    }
    if (typeof token === 'string') {
      document.cookie = `token=${token}`;
      window.location.href = '/';
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button type="submit">Log In</button>
        {error && <p>Error: {error}</p>}
      </form>
      <br />
      <p>
        Don't use a password you like. The security on this thing isn't very
        good
      </p>
    </>
  );
}

async function fetchToken(email: string, password: string) {
  const response = await fetch(`http://localhost:3000/api/user/signup`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    })
  });
  return response.json();
}
