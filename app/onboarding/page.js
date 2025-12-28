"use client";

import { useState, useEffect } from "react";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function OnboardingPage() {
    const [whatsapp, setWhatsapp] = useState("");
    const [upiId, setUpiId] = useState("");
    const [university, setUniversity] = useState("");
    const [loading, setLoading] = useState(true);

    const router = useRouter();

    // 🔐 Protect route + skip if already onboarded
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push("/auth");
                return;
            }

            // Check if user already completed onboarding
            const userRef = doc(db, "users", user.uid);
            const snap = await getDoc(userRef);

            if (snap.exists()) {
                router.push("/");
            } else {
                setLoading(false);
            }
        });

        return () => unsub();
    }, []);

    async function handleSubmit() {
        const user = auth.currentUser;
        if (!user) return;

        if (!whatsapp || !university) {
            alert("WhatsApp number and University are required");
            return;
        }

        try {
            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                whatsapp,                 // no country code required
                upiId: upiId || "",
                university,
                createdAt: serverTimestamp(),
            });

            router.push("/");
        } catch (error) {
            console.error("Onboarding error:", error);
            alert("Failed to save data. Check console.");
        }
    }



    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-yellow-200 via-white to-sky-200">
            <div className="bg-white border-4 border-black p-8 w-full max-w-md shadow-[8px_8px_0px_black] relative overflow-hidden">
                {/* Decorative Strip */}
                <div className="absolute top-0 left-0 w-full h-4 bg-lime-400 border-b-2 border-black"></div>

                <div className="mb-8 mt-2">
                    <h1 className="text-3xl md:text-4xl font-black mb-2 uppercase tracking-tighter">
                        Almost There 👀
                    </h1>
                    <p className="font-bold text-gray-600">
                        We just need a few details to get you started.
                    </p>
                </div>

                <div className="space-y-5">
                    <div>
                        <label className="font-bold text-sm ml-1 block mb-1">WhatsApp Number</label>
                        <input
                            value={whatsapp}
                            className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_black] transition-all bg-gray-50"
                            placeholder="9876543210"
                            onChange={(e) =>
                                setWhatsapp(e.target.value.replace(/[^0-9]/g, ""))
                            }
                        />
                    </div>

                    <div>
                        <label className="font-bold text-sm ml-1 block mb-1">UPI ID <span className="text-gray-400 font-normal">(Optional)</span></label>
                        <input
                            value={upiId}
                            className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_black] transition-all bg-gray-50"
                            placeholder="user@upi"
                            onChange={(e) => setUpiId(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="font-bold text-sm ml-1 block mb-1">University / College</label>
                        <input
                            value={university}
                            className="w-full border-2 border-black p-3 font-bold focus:outline-none focus:shadow-[4px_4px_0px_black] transition-all bg-gray-50"
                            placeholder="e.g. Sastra University"
                            onChange={(e) => setUniversity(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-black text-white py-4 font-black text-lg border-2 border-black hover:bg-lime-400 hover:text-black hover:shadow-[4px_4px_0px_black] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase mt-4"
                    >
                        Enter Yoink 🚀
                    </button>
                </div>
            </div>
        </div>
    );
}
