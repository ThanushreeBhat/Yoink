"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ListingCard from "../../components/ListingCard";

export default function ProfilePage() {
    const [listings, setListings] = useState([]);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push("/auth");
                return;
            }

            setLoading(true);
            try {
                // 1. Fetch User Data
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                }

                // 2. Fetch User's Listings
                const q = query(
                    collection(db, "listings"),
                    where("sellerId", "==", user.uid),
                    orderBy("createdAt", "desc")
                );
                const snap = await getDocs(q);
                setListings(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
            } catch (error) {
                console.error("Error fetching profile data:", error);
                // Graceful error handling for missing index
                if (error.message.includes("requires an index")) {
                    alert("Firestore Index missing! Check console for the link to create it.");
                }
            } finally {
                setLoading(false);
            }
        });

        return () => unsub();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <p className="text-2xl font-black animate-pulse">LOADING YOINKS...</p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-yellow-200 via-white to-sky-200 p-6 pb-24">
            <div className="max-w-6xl mx-auto">
                <Link
                    href="/"
                    className="inline-block mb-8 text-sm font-bold underline hover:bg-black hover:text-white px-2 transition-colors"
                >
                    ← Back to Feed
                </Link>

                {/* Profile Header Block */}
                <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_black] mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black mb-2 uppercase">
                            {userData?.university || "Unknown University"}
                        </h1>
                        <div className="flex flex-wrap gap-2 text-sm font-bold">
                            <span className="bg-lime-400 border-2 border-black px-2 py-1">
                                {userData?.email}
                            </span>
                            <span className="bg-gray-200 border-2 border-black px-2 py-1">
                                WA: {userData?.whatsapp}
                            </span>
                            {userData?.upiId && (
                                <span className="bg-purple-200 border-2 border-black px-2 py-1">
                                    UPI: {userData.upiId}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="font-black text-xl">
                            {listings.length} {listings.length === 1 ? 'DROP' : 'DROPS'}
                        </p>
                        <Link
                            href="/create"
                            className="inline-block mt-2 bg-black text-white px-4 py-2 font-bold border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors"
                        >
                            + New Drop
                        </Link>
                    </div>
                </div>

                <h2 className="text-3xl font-black mb-6 bg-white inline-block border-2 border-black px-4 py-1 shadow-[4px_4px_0px_black]">
                    YOUR STASH 📦
                </h2>

                {listings.length === 0 ? (
                    <div className="text-center py-20 border-4 border-black border-dashed bg-white">
                        <p className="text-2xl font-black text-gray-400 uppercase mb-4">It's quiet here...</p>
                        <Link
                            href="/create"
                            className="text-lg font-bold border-b-4 border-lime-400 hover:bg-lime-400 transition-colors"
                        >
                            Start selling some stuff!
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listings.map((l) => (
                            <ListingCard key={l.id} listing={l} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
