import { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import { CHARACTERS } from './constants';
import { Character } from './types';
import { Menu, X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [hasAcceptedDisclaimer, setHasAcceptedDisclaimer] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character>(CHARACTERS[0]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSelectCharacter = (char: Character) => {
    setSelectedCharacter(char);
    setIsMobileMenuOpen(false);
  };

  if (!hasAcceptedDisclaimer) {
    return (
      <div className="flex h-screen bg-sim-bg items-center justify-center p-4 font-sans text-sim-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-sim-yellow/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-sim-yellow/20 rounded-full blur-3xl pointer-events-none" />
        
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border-4 border-sim-black p-8 rounded-3xl shadow-[8px_8px_0_rgba(0,0,0,1)] max-w-md w-full text-center relative z-10"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-sim-yellow mb-2 rounded-full border-2 border-sim-black shadow-[4px_4px_0_rgba(0,0,0,1)]">
              <AlertTriangle size={48} className="text-sim-black" />
            </div>
          </div>
          <h2 className="text-2xl font-black mb-4 uppercase tracking-tight">Perhatian!</h2>
          <p className="text-slate-600 mb-8 font-medium leading-relaxed">
            Semua percakapan dan peran tokoh di sini sepenuhnya digenerate oleh AI dan <strong>HANYA UNTUK HIBURAN SEMATA</strong>. 
            Jangan diambil hati apalagi dibawa serius ya bree! ✌️
          </p>
          <button 
            onClick={() => setHasAcceptedDisclaimer(true)}
            className="w-full bg-sim-yellow text-sim-black font-bold py-4 rounded-xl border-2 border-sim-black shadow-[4px_4px_0_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all uppercase tracking-widest text-sm active:bg-sim-yellow/90"
          >
            Paham, Gas Ngobrol!
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white text-slate-800 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <Sidebar 
        characters={CHARACTERS} 
        selectedCharacter={selectedCharacter} 
        onSelect={handleSelectCharacter} 
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative h-full">
        {/* Mobile Nav Toggle */}
        <div className="md:hidden absolute top-4 left-4 z-50">
          <button 
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-3 bg-sim-yellow shadow-lg rounded-full text-sim-black border-2 border-sim-black z-50"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 md:hidden"
              />
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed inset-y-0 left-0 w-4/5 max-w-xs bg-white z-40 md:hidden shadow-2xl flex flex-col"
              >
                <div className="p-6 border-b-2 border-sim-black bg-sim-yellow">
                  <h1 className="text-xl font-black text-sim-black drop-shadow-sm">BanyakCingCong</h1>
                </div>
                <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                  {CHARACTERS.map((char) => (
                    <button
                      key={char.id}
                      onClick={() => handleSelectCharacter(char)}
                      className={`w-full px-6 py-4 flex items-center gap-4 transition-all ${
                        selectedCharacter.id === char.id ? "bg-sim-yellow/30 text-sim-black border-l-4 border-sim-yellow" : "text-slate-600"
                      }`}
                    >
                      <img src={char.avatar} alt={char.name} className="w-12 h-12 rounded-full object-cover border-2 border-sim-black shadow-sm" />
                      <div className="text-left">
                        <h3 className="font-semibold text-sm">{char.name}</h3>
                        <p className="text-[10px] opacity-70">{char.role}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <ChatInterface character={selectedCharacter} />
      </main>
    </div>
  );
}
