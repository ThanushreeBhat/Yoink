"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import ListingCard from "../components/ListingCard";
import Link from "next/link";
import Header from "../components/Header";
import ToggleSwitch from "../components/ToggleSwitch";

export default function HomePage() {
  const [mode, setMode] = useState("loot");
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function fetchListings() {
      const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));
      const snap = await getDocs(q);
      setListings(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }
    fetchListings();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-200 via-white to-sky-200 p-6 pb-24">
      <div className="max-w-6xl mx-auto">
        <Header />

        <ToggleSwitch mode={mode} setMode={setMode} />

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {listings
            .filter(l => l.type === mode)
            .map(l => (
              <ListingCard key={l.id} listing={l} />
            ))}
        </div>

        {listings.length === 0 && (
          <div className="text-center py-20 border-4 border-black border-dashed mt-8 bg-white/50">
            <p className="text-2xl font-black text-gray-400 uppercase">No Yoinks yet...</p>
            <p className="font-bold">Be the first to drop one!</p>
          </div>
        )}
      </div>
    </main>
  );
}
