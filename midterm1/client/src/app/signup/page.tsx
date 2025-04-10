'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function SignUp() {
  const [username, setUser] = useState('');
  const [password, setPass] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  
  const loginAndStoreToken = async () => {
    const loginData = new URLSearchParams();
    loginData.append('username', username);
    loginData.append('password', password);
  
    const loginRes = await axios.post('http://localhost:8000/token', loginData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  
    const token = loginRes.data.access_token;
    localStorage.setItem("token", token);
  };

  const register = async () => {
    try {
      const res = await axios.post('http://localhost:8000/register', {
        username,
        password
      },{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await loginAndStoreToken();
      router.push('/binder');
    } catch (err: any) {
      setMessage("❌ Registration failed: " + err.response?.data?.detail);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-black border border-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Welcome</h2>
        <input
          className="w-full p-3 rounded border border-white bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Username"
          onChange={e => setUser(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-3 rounded border border-white bg-black text-white focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Password"
          onChange={e => setPass(e.target.value)}
        />
        <button
          onClick={register}
          className="w-full p-3 rounded bg-white text-black hover:bg-gray-200 transition-colors font-semibold cursor-pointer"
        >
          Sign Up
        </button>
        <p className="text-center text-sm mt-4">
          Already have an account?{' '}
          <Link href="/login" className="underline text-blue-400 hover:text-blue-300">
            Login          
          </Link>
        </p>
        {message && (
          <p className="text-sm text-center mt-2">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
