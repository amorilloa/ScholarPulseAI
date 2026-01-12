
import React, { useState } from 'react';
import Header from './components/Header';
import FileUploader from './components/FileUploader';
import LoadingOverlay from './components/LoadingOverlay';
import AnalysisResult from './components/AnalysisResult';
import SectionSelector from './components/SectionSelector';
import { analyzePaper } from './services/geminiService';
import { AnalysisResult as ResultType, SectionId } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [selectedSections, setSelectedSections] = useState<SectionId[]>([
    'keywords', 'nonExpert', 'universityStudent', 'professionalColleague', 
    'potentialApplications', 'strengthsAndLimitations', 'creativeExtensions', 'summaries'
  ]);
  const [error, setError] = useState<string | null>(null);

  const handleToggleSection = (id: SectionId) => {
    setSelectedSections(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    if (!currentFile) return;
    if (selectedSections.length === 0) {
      setError("Please select at least one section.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        try {
          const analysisResult = await analyzePaper(base64, currentFile.type, selectedSections);
          setResult(analysisResult);
        } catch (err: any) {
          console.error(err);
          setError(err.message || "An error occurred while analyzing the paper.");
        } finally {
          setLoading(false);
        }
      };
      reader.onerror = () => {
        setError("Failed to read the file.");
        setLoading(false);
      };
      reader.readAsDataURL(currentFile);
    } catch (err: any) {
      setError("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8 bg-white text-slate-900">
      {loading && <LoadingOverlay />}
      
      <Header />

      {!result && !loading && (
        <main className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <FileUploader onFileSelect={setCurrentFile} isLoading={loading} />
          
          {currentFile && (
            <div className="max-w-3xl mx-auto mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-semibold text-slate-800 truncate max-w-xs">{currentFile.name}</span>
              </div>
              <button 
                onClick={() => setCurrentFile(null)}
                className="text-xs font-bold text-slate-400 hover:text-red-500 uppercase tracking-tighter"
              >
                Remove
              </button>
            </div>
          )}

          {currentFile && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-500">
              <SectionSelector 
                selectedSections={selectedSections} 
                onToggle={handleToggleSection} 
              />
              <div className="max-w-3xl mx-auto mt-8 flex justify-center">
                <button 
                  onClick={handleGenerate}
                  disabled={selectedSections.length === 0}
                  className="px-10 py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold transition-all shadow-xl shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1"
                >
                  Generate Analysis
                </button>
              </div>
            </div>
          )}
          
          {error && (
            <div className="max-w-3xl mx-auto mt-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center space-x-3 text-red-600">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {!currentFile && (
            <div className="max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group p-6 border border-slate-50 rounded-3xl">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-800">Clear Communication</h4>
                <p className="text-sm text-slate-500 mt-2">Translate technical findings for everyone from grandma to fellow PhDs.</p>
              </div>
              <div className="text-center group p-6 border border-slate-50 rounded-3xl">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-800">Impact Discovery</h4>
                <p className="text-sm text-slate-500 mt-2">Uncover potential real-world applications and future research avenues.</p>
              </div>
              <div className="text-center group p-6 border border-slate-50 rounded-3xl">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-800">Social Ready</h4>
                <p className="text-sm text-slate-500 mt-2">Get instant tweet-length summaries to share your findings with the world.</p>
              </div>
            </div>
          )}
        </main>
      )}

      {result && <AnalysisResult data={result} paperName={currentFile?.name || "Paper"} />}
    </div>
  );
};

export default App;
