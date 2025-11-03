import React from 'react';
import InteractiveNet from './components/InteractiveNet';

const App: React.FC = () => {
  return (
    <main className="relative w-screen h-screen bg-black overflow-hidden">
      <InteractiveNet />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white pointer-events-none">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-400">
          Interactive Net
        </h1>
        <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-2xl">
          Move your mouse across the screen to interact with the dynamic background. The net will deform and follow your cursor's path.
        </p>
      </div>
    </main>
  );
};

export default App;
