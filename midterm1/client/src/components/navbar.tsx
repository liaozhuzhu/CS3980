'use client'
import Link from 'next/link'

const Navbar = () => {
    return (
        <div className="flex w-full items-center justify-between p-5 text-white outline fixed top-0 left-0 bg-zinc-950 z-[1000]">
            <img src="/images/pokedex.png" alt="pokedex" className="cursor-pointer h-10" />
            <nav className="flex space-x-4">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/create" className="hover:underline">Create</Link>
                <Link href="/binder" className="hover:underline">Binder</Link>
            </nav>
        </div>
    )
}

export default Navbar