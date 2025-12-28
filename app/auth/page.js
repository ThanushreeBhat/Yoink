"use client";

import { useState } from "react";
import { auth } from "../../lib/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

export default function AuthPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const router = useRouter();

    async function handleAuth() {
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
                router.push("/onboarding");
                return;
            }
            router.push("/");
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-yellow-200 via-white to-sky-200">
            <div className="bg-white border-4 border-black p-8 w-full max-w-md shadow-[8px_8px_0px_black]">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-black mb-2 transform rotate-[-2deg] inline-block bg-lime-400 border-2 border-black px-4 py-1 shadow-[4px_4px_0px_black]">
                        YOINK
                    </h1>
                    <p className="font-bold text-xl mt-4">
                        {isLogin ? "Welcome Back! 👋" : "Join the Club 🚀"}
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="font-bold text-sm ml-1 block mb-1">Email</label>
                        <input
                            className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_black] transition-all bg-gray-50"
                            placeholder="student@university.edu"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="font-bold text-sm ml-1 block mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_black] transition-all bg-gray-50"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleAuth}
                        className="w-full bg-black text-white border-2 border-black py-3 font-black text-lg hover:bg-lime-400 hover:text-black hover:shadow-[4px_4px_0px_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase"
                    >
                        {isLogin ? "Login" : "Create Account"}
                    </button>
                </div>

                <p
                    onClick={() => setIsLogin(!isLogin)}
                    className="mt-6 text-center cursor-pointer font-bold hover:underline select-none"
                >
                    {isLogin ? (
                        <span>New here? <span className="text-blue-600">Sign Up</span></span>
                    ) : (
                        <span>Already have an account? <span className="text-blue-600">Login</span></span>
                    )}
                </p>
            </div>
        </div>
    );
}
