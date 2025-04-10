'use client'
import { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { user, logout, checkUser } = useAuth();
  const pathname = usePathname();
  
  // Check auth state on route changes
  useEffect(() => {
    checkUser();
  }, [pathname, checkUser]);
  
  return (
    <div className="flex w-full items-center justify-between p-5 text-white outline fixed top-0 left-0 bg-zinc-950 z-[1000]">
      <img src="/images/pokedex.png" alt="pokedex" className="cursor-pointer h-10" />
      {user ? (
        <nav className="flex space-x-4 items-center">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/create" className="hover:underline">Create</Link>
          <Link href="/binder" className="hover:underline">Binder</Link>
          <button 
            onClick={() => {
              logout();
              // Use router navigation or window.location.href if you need a full page refresh
            }} 
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded cursor-pointer font-medium transition-colors"
          >
            Logout
          </button>
        </nav>
      ) : (
        <nav className="flex space-x-4">
          <Link href="/login" className="hover:underline">Login</Link>
          <Link href="/signup" className="hover:underline">Sign Up</Link>
        </nav>
      )}
    </div>
  );
};

export default Navbar;