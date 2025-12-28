"use client";

import QRCode from "react-qr-code";

export default function ListingCard({ listing }) {
    const waLink = `https://wa.me/?text=Interested in: ${listing.title}`;

    const upiLink = listing.upiId
        ? `upi://pay?pa=${listing.upiId}&pn=Yoink&am=${listing.price}`
        : null;

    return (
        <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0px_black] hover:-translate-y-2 hover:shadow-[12px_12px_0px_black] transition-all duration-300">
            {/* Image Container */}
            <div className="relative border-2 border-black mb-4 bg-gray-100 h-48 overflow-hidden group">
                <img
                    src={listing.image || "https://placehold.co/400x400/png?text=No+Image"}
                    alt={listing.title}
                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />

                {/* Price Tag Sticker */}
                <div className="absolute -bottom-3 -right-3 bg-lime-400 border-2 border-black px-4 py-1 transform rotate-[-3deg] shadow-[2px_2px_0px_black]">
                    <span className="font-black text-xl">₹{listing.price}</span>
                </div>
            </div>

            {/* Content */}
            <div className="mt-2">
                <h3 className="font-black text-2xl uppercase tracking-tighter truncate leading-none">
                    {listing.title}
                </h3>
                <p className="font-bold text-sm bg-black text-white inline-block px-1 mt-1 mb-2">
                    {listing.type === 'loot' ? 'FOR SALE' : 'SERVICE'}
                </p>
                <p className="text-gray-800 font-medium line-clamp-2 min-h-[3rem] border-t-2 border-black/10 pt-2">
                    {listing.description}
                </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4 pt-4 border-t-4 border-black">
                <a
                    href={waLink}
                    target="_blank"
                    className="flex-1 bg-black text-white text-center py-2 font-black border-2 border-black hover:bg-white hover:text-black transition-colors uppercase text-sm"
                >
                    Chat 💬
                </a>
                {upiLink && (
                    <button
                        className="bg-lime-400 border-2 border-black p-2 font-bold hover:bg-white transition-colors"
                        title="Show QR Code"
                    >
                        💸
                    </button>
                )}
            </div>
        </div>
    );
}
