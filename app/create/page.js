"use client";

import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function CreatePage() {
    const router = useRouter();

    const [type, setType] = useState("loot");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [pricingModel, setPricingModel] = useState("Fixed");
    const [image, setImage] = useState("");

    // ✅ HOOK IS NOW INSIDE COMPONENT
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (!user) router.push("/auth");
        });
        return () => unsub();
    }, [router]);

    async function handleSubmit() {
        const user = auth.currentUser;
        if (!user) return;

        if (!title || !price) {
            alert("Title and price are required");
            return;
        }

        try {
            await addDoc(collection(db, "listings"), {
                title,
                description,
                price: Number(price),
                type,
                pricingModel,
                image,
                sellerId: user.uid,
                createdAt: serverTimestamp(),
            });

            router.push("/");
        } catch (err) {
            console.error("Create listing error:", err);
            alert("Failed to create listing");
        }
    }

    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-yellow-200 via-white to-sky-200">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => router.push("/")}
                    className="mb-8 font-bold border-2 border-black bg-white px-4 py-2 hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_black]"
                >
                    ← Back to Feed
                </button>

                <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_black]">
                    <h1 className="text-4xl font-black border-b-4 border-black pb-4 mb-8 uppercase tracking-tight">
                        Drop a Yoink 📦
                    </h1>

                    <div className="space-y-6">
                        <div>
                            <label className="font-bold block mb-2">What are you offering?</label>
                            <div className="flex gap-4">
                                {["loot", "gig"].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setType(t)}
                                        className={`flex-1 py-3 font-black border-2 border-black transition-all ${type === t
                                            ? "bg-lime-400 shadow-[2px_2px_0px_black] translate-x-[1px] translate-y-[1px]"
                                            : "bg-white hover:bg-gray-100"
                                            }`}
                                    >
                                        {t === "loot" ? "SELLING LOOT" : "OFFERING GIG"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="font-bold block mb-2">Title</label>
                            <input
                                className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_black] transition-all bg-gray-50"
                                placeholder={type === "loot" ? "e.g. Engineering Graphics Textbook" : "e.g. I can design your posters"}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="font-bold block mb-2">Description</label>
                            <textarea
                                className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_black] transition-all bg-gray-50 min-h-[120px]"
                                placeholder="Describe it in detail..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="font-bold block mb-2">Price (₹)</label>
                                <input
                                    type="number"
                                    className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_black] transition-all bg-gray-50"
                                    placeholder="0"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>

                            {type === "gig" && (
                                <div>
                                    <label className="font-bold block mb-2">Pricing Model</label>
                                    <select
                                        className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_black] transition-all bg-white"
                                        value={pricingModel}
                                        onChange={(e) => setPricingModel(e.target.value)}
                                    >
                                        <option>Fixed Price</option>
                                        <option>Per Hour</option>
                                        <option>Per Page</option>
                                        <option>Per Assignment</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="font-bold block mb-2">Image URL</label>
                            <input
                                className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_black] transition-all bg-gray-50"
                                placeholder="https://..."
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                            {image && (
                                <img src={image} alt="Preview" className="mt-4 h-32 w-full object-cover border-2 border-black" />
                            )}
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-black text-white py-4 font-black text-xl border-2 border-black hover:bg-lime-400 hover:text-black hover:shadow-[6px_6px_0px_black] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[1px_1px_0px_black] transition-all uppercase mt-8"
                        >
                            Publish Yoink
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
