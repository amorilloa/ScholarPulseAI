
import React from 'react';
import { AnalysisResult as ResultType } from '../types';

interface AnalysisResultProps {
  data: ResultType;
  paperName: string;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ data, paperName }) => {
  const hasExplanations = data.explanations && (data.explanations.nonExpert || data.explanations.universityStudent || data.explanations.professionalColleague);
  const hasStrengths = data.strengthsAndLimitations && (data.strengthsAndLimitations.strengths?.length || data.strengthsAndLimitations.limitations?.length);
  const hasSummaries = data.summaries && (data.summaries.tweet || data.summaries.bulletPoints?.length);

  return (
    <div className="max-w-5xl mx-auto mt-12 mb-20 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
        <div>
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Research Impact Profile</span>
          <h2 className="text-xl font-bold text-slate-900 mt-1 truncate max-w-lg">{paperName}</h2>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-colors"
        >
          New Analysis
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Keywords */}
        {data.keywords && data.keywords.length > 0 && (
          <section className="md:col-span-3 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 11h.01M7 15h.01M13 7h.01M13 11h.01M13 15h.01M17 7h.01M17 11h.01M17 15h.01" />
              </svg>
              Key Research Phrases
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.keywords.map((kw, i) => (
                <span key={i} className="px-4 py-1.5 bg-slate-50 text-slate-900 rounded-full text-sm font-medium border border-slate-200">
                  {kw}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Explanations */}
        {hasExplanations && (
          <section className="md:col-span-2 space-y-6">
            {data.explanations?.nonExpert && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 border-l-4 border-l-green-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mr-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">For Family & Friends</h3>
                    <p className="text-xs text-slate-500">Accessible core idea</p>
                  </div>
                </div>
                <p className="text-slate-800 leading-relaxed italic">"{data.explanations.nonExpert}"</p>
              </div>
            )}

            {data.explanations?.universityStudent && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 border-l-4 border-l-blue-500">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mr-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">For University Students</h3>
                    <p className="text-xs text-slate-500">Academic undergraduate perspective</p>
                  </div>
                </div>
                <p className="text-slate-800 leading-relaxed">{data.explanations.universityStudent}</p>
              </div>
            )}

            {data.explanations?.professionalColleague && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 border-l-4 border-l-slate-900">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-900 mr-4">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Professional Summary</h3>
                    <p className="text-xs text-slate-500">Technical peer synthesis</p>
                  </div>
                </div>
                <p className="text-slate-800 leading-relaxed font-mono text-sm leading-6">{data.explanations.professionalColleague}</p>
              </div>
            )}
          </section>
        )}

        {/* Sidebar Insights */}
        <aside className="space-y-6">
          {/* Tweet Summary */}
          {data.summaries?.tweet && (
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl overflow-hidden relative">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Social Snapshot</h3>
              <p className="text-lg leading-snug font-medium mb-4">{data.summaries.tweet}</p>
              <div className="text-xs text-slate-500 flex justify-between items-center border-t border-slate-800 pt-4">
                <span>{data.summaries.tweet.length} / 280 chars</span>
                <button className="text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-tighter">Copy</button>
              </div>
            </div>
          )}

          {/* Bullet Points */}
          {data.summaries?.bulletPoints && data.summaries.bulletPoints.length > 0 && (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Core Takeaways</h3>
              <ul className="space-y-3">
                {data.summaries.bulletPoints.map((bp, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-1.5 h-1.5 bg-slate-900 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-slate-800 text-sm leading-relaxed">{bp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Extensions */}
          {data.creativeExtensions && data.creativeExtensions.length > 0 && (
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Future Frontiers</h3>
              <div className="space-y-4">
                {data.creativeExtensions.map((ext, i) => (
                  <div key={i} className="p-4 bg-white border border-slate-200 rounded-2xl">
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">{ext}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Strengths & Limitations */}
        {hasStrengths && (
          <section className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.strengthsAndLimitations?.strengths && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 border-t-4 border-t-emerald-500 shadow-sm">
                <h3 className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-4">Research Strengths</h3>
                <ul className="space-y-2">
                  {data.strengthsAndLimitations.strengths.map((str, i) => (
                    <li key={i} className="text-slate-800 text-sm flex items-start italic">
                       <span className="mr-2 text-emerald-500 font-bold">✓</span> {str}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {data.strengthsAndLimitations?.limitations && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200 border-t-4 border-t-amber-500 shadow-sm">
                <h3 className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-4">Identified Constraints</h3>
                <ul className="space-y-2">
                  {data.strengthsAndLimitations.limitations.map((lim, i) => (
                    <li key={i} className="text-slate-800 text-sm flex items-start italic">
                       <span className="mr-2 text-amber-500 font-bold">⚠</span> {lim}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Applications */}
        {data.potentialApplications && data.potentialApplications.length > 0 && (
          <section className="md:col-span-3 bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Impact Pathways</h3>
                <p className="text-slate-500">Real-world translation of findings</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.potentialApplications.map((app, i) => (
                <div key={i} className="flex items-start p-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <div className="mr-4 mt-1 bg-slate-100 text-slate-900 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i+1}
                  </div>
                  <p className="text-slate-800 leading-relaxed">{app}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AnalysisResult;
