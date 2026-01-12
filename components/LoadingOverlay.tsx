
import React, { useState, useEffect } from 'react';

const LoadingOverlay: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Parsing theoretical frameworks...",
    "Simplifying technical jargon for non-experts...",
    "Synthesizing core findings...",
    "Identifying cross-disciplinary applications...",
    "Generating academic context for colleagues...",
    "Drafting social media summaries...",
    "Almost ready for prime time..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-md z-50 flex flex-col items-center justify-center p-6">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-4 bg-indigo-50 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-indigo-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-semibold text-slate-800 animate-pulse transition-all duration-500">
        {messages[messageIndex]}
      </h3>
      <p className="text-slate-500 mt-2">ScholarPulse AI is reading your paper carefully...</p>
    </div>
  );
};

export default LoadingOverlay;
