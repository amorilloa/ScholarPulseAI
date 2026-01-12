
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 px-4 text-center">
      <div className="inline-flex items-center space-x-2 bg-white/50 px-4 py-2 rounded-full border border-indigo-100 mb-6">
        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
        <span className="text-sm font-medium text-indigo-700 uppercase tracking-widest">Scientific Communicator</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
        ScholarPulse <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">AI</span>
      </h1>
      <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto font-light">
        Bridging the gap between complex research and meaningful communication. 
        Upload your paper and let AI explain your impact to the world.
      </p>
    </header>
  );
};

export default Header;
