
import React from 'react';
import type { Candidate } from '../types';

interface CandidateCardProps {
  candidate: Candidate;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-lg font-bold text-slate-800">Candidate #{candidate.id.toUpperCase()}</h4>
          <p className="text-sm text-slate-500">Matched for: {candidate.role}</p>
        </div>
        <div className={`flex items-center justify-center font-bold text-lg rounded-full w-16 h-16 ${candidate.score >= 75 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
          {candidate.score}%
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-700 mb-2">AI-Powered Skill Summary:</p>
        <p className="text-slate-600 bg-slate-100/70 p-3 rounded-md text-sm">
          {candidate.summary}
        </p>
      </div>
      <div className="mt-auto pt-4">
        <button className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
          Request Interview
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;
