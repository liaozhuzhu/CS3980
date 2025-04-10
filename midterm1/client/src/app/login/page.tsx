'use client'

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/token", new URLSearchParams({
        username,
        password
      }));
      const token = res.data.access_token;
      localStorage.setItem("token", token);
      router.push('/binder');
    } catch (err) {
      setMessage("❌ Login failed: Invalid username or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-black border border-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={login} className="space-y-4">
          <input
            className="w-full p-3 rounded border border-white bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Username"
            onChange={e => setUser(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full p-3 rounded border border-white bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
            placeholder="Password"
            onChange={e => setPass(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full p-3 rounded bg-white text-black hover:bg-gray-200 transition-colors font-semibold cursor-pointer"
          >
            Login
          </button>
        </form>
        {message && (
          <p className="text-sm text-center mt-2">
            {message}
          </p>
        )}
        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="underline text-blue-400 hover:text-blue-300">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
