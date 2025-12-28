"use client";

import Link from "next/link";
import { useState } from "react";
import { auth } from "../lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    async function handleLogout() {
        await signOut(auth);
        router.push("/auth");
    }

    return (
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            {/* Title Section */}
            <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-6xl font-black border-4 border-black p-4 inline-block bg-white shadow-[8px_8px_0px_black] transform rotate-[-2deg] hover:rotate-0 transition-transform duration-200">
                    YOINK
                </h1>
                <p className="mt-4 font-bold text-lg tracking-wide uppercase bg-black text-white inline-block px-2">
                    Grab it before it's gone.
                </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 relative">
                <Link
                    href="/create"
                    className="bg-lime-400 border-2 border-black px-6 py-3 font-black text-lg shadow-[4px_4px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_black] transition-all active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
                >
                    Drop a Yoink ➕
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center font-black text-xl shadow-[4px_4px_0px_black] hover:bg-gray-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_black] transition-all"
                    >
                        👤
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border-2 border-black shadow-[4px_4px_0px_black] z-50">
                            <Link
                                href="/profile"
                                className="block px-4 py-3 font-bold hover:bg-lime-400 border-b-2 border-black transition-colors"
                                onClick={() => setMenuOpen(false)}
                            >
                                Your Yoinks 📦
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-3 font-bold hover:bg-red-400 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
