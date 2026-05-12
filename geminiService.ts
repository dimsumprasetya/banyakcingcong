@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Quicksand", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;

  --color-sim-yellow: #FFF200;
  --color-sim-bg: #FFFFFF;
  --color-sim-black: #2D2D2D;
}

@layer base {
  body {
    @apply bg-sim-bg text-sim-black font-sans antialiased;
  }
}

.chat-bubble-user {
  @apply bg-sim-yellow text-sim-black rounded-3xl rounded-tr-sm px-5 py-3 max-w-[85%] self-end shadow-md border-2 border-sim-black font-bold;
}

.chat-bubble-ai {
  @apply bg-white border-2 border-sim-black text-sim-black rounded-3xl rounded-tl-sm px-5 py-3 max-w-[85%] self-start shadow-md font-semibold;
}

.sidebar-item-active {
  @apply bg-sim-yellow/30 border-r-4 border-sim-yellow;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: white;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-sim-yellow rounded-full border-2 border-white;
}
