import { motion, AnimatePresence } from "motion/react";
import { Character } from "../types";
import { MessageSquare, Info, History, Heart, X } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  characters: Character[];
  selectedCharacter: Character;
  onSelect: (char: Character) => void;
}

export default function Sidebar({ characters, selectedCharacter, onSelect }: SidebarProps) {
  const [showDonate, setShowDonate] = useState(false);

  return (
    <div className="w-80 h-full bg-white border-r border-slate-200 flex flex-col hidden md:flex relative">
      <div className="p-6 border-bottom border-slate-100 bg-sim-yellow/10">
        <h1 className="text-2xl font-black text-sim-black flex items-center gap-2 drop-shadow-[0_2px_0_rgba(255,242,0,1)] tracking-tighter">
           BanyakCingCong
        </h1>
        <p className="text-slate-500 text-sm mt-1 font-semibold">ngobrol santuy sama Tokoh Indonesia</p>
      </div>

      <div className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        <div className="px-6 mb-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pilih Tokoh</h2>
        </div>
        {characters.map((char) => (
          <button
            id={`char-btn-${char.id}`}
            key={char.id}
            onClick={() => onSelect(char)}
            className={`w-full px-6 py-4 flex items-center gap-4 transition-all hover:bg-slate-50 relative group ${
              selectedCharacter.id === char.id ? "sidebar-item-active" : "text-slate-600"
            }`}
          >
            {selectedCharacter.id === char.id && (
              <motion.div
                layoutId="active-marker"
                className="absolute left-0 w-2 h-10 bg-sim-yellow rounded-r-full border-y border-r border-sim-black"
              />
            )}
            <img
              src={char.avatar}
              alt={char.name}
              referrerPolicy="no-referrer"
              className={`w-14 h-14 rounded-full object-cover shadow-md transition-transform group-hover:scale-110 border-2 border-sim-black ${
                selectedCharacter.id === char.id ? "ring-4 ring-sim-yellow/40" : ""
              }`}
            />
            <div className="text-left flex-1 min-w-0">
              <h3 className={`font-bold truncate ${selectedCharacter.id === char.id ? "text-sim-black" : "text-slate-800"}`}>
                {char.name}
              </h3>
              <p className="text-xs text-slate-500 truncate font-medium">{char.role}</p>
            </div>
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-slate-100 flex flex-col gap-2">
        <p className="text-[10px] text-slate-400 uppercase tracking-widest text-center leading-relaxed">
          buat hiburan semata biar lemes
        </p>
        <button
          onClick={() => setShowDonate(true)}
          className="w-full py-2 bg-sim-yellow border-2 border-sim-black rounded-lg text-xs font-bold shadow-[2px_2px_0_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-none transition-all flex items-center justify-center gap-2"
        >
          <Heart size={14} className="fill-current" />
          kalo terhibur boleh dong bayar
        </button>
      </div>

      {/* Donation Modal */}
      <AnimatePresence>
        {showDonate && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDonate(false)}
              className="absolute inset-0 bg-sim-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white border-4 border-sim-black p-6 rounded-3xl shadow-[8px_8px_0_rgba(0,0,0,1)] max-w-sm w-full relative z-[101] text-center"
            >
              <button 
                onClick={() => setShowDonate(false)}
                className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-full"
              >
                <X size={20} />
              </button>
              <h3 className="text-xl font-bold mb-4">Bayar Treat Mama/Bapak</h3>
              <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 mb-4 flex justify-center flex-col items-center gap-4">
                <div className="text-xl md:text-2xl font-black text-slate-800 font-mono tracking-widest bg-sim-yellow/30 px-4 py-3 rounded-xl border-2 border-sim-black">
                  3901081806335265
                </div>
              </div>
              <p className="text-sm text-slate-500 font-medium">Kirim ke nomer DANA di atas ya!</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
