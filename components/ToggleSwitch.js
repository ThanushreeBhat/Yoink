"use client";

export default function ToggleSwitch({ mode, setMode }) {
    return (
        <div className="flex justify-center my-8">
            <div className="flex border-4 border-black bg-white shadow-[6px_6px_0px_black] p-1">
                {["loot", "gig"].map((t) => (
                    <button
                        key={t}
                        onClick={() => setMode(t)}
                        className={`px-4 md:px-8 py-2 font-black text-sm md:text-lg transition-all transform duration-200 border-2 border-transparent ${mode === t
                            ? "bg-lime-400 border-black shadow-[-2px_2px_0px_black]"
                            : "hover:bg-gray-100"
                            }`}
                    >
                        {t === "loot" ? "LOOT 🛒" : "GIGS ⚡"}
                    </button>
                ))}
            </div>
        </div>
    );
}
