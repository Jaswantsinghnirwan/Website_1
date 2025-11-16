

import React, { useState, useEffect, useCallback } from 'react';
import type { Candidate } from '../types';
import CandidateCard from './CandidateCard';
import { UserSearchIcon } from './icons';

// Mock candidates pool
// FIX: Added 'name' property to each mock candidate to match the 'Candidate' type.
const MOCK_CANDIDATES: Omit<Candidate, 'role'>[] = [
    { id: 'c1', name: 'Alex Doe', score: 95, summary: 'Exceptional problem-solver with deep knowledge of React hooks and state management. Answers demonstrate a strong understanding of performance optimization and component architecture. A clear senior-level candidate.' },
    { id: 'c2', name: 'Brenda Smith', score: 91, summary: 'Strong grasp of core JavaScript and React principles. Effectively explained complex topics like the virtual DOM. Shows great potential and a solid foundation for a mid-to-senior role.' },
    { id: 'c3', name: 'Charlie Brown', score: 88, summary: 'Solid technical skills, particularly in API integration and asynchronous JavaScript. Could improve on explaining architectural choices, but clearly capable and experienced.' },
    { id: 'c4', name: 'Diana Prince', score: 82, summary: 'Good understanding of UI/UX principles and CSS-in-JS. Answers were practical and user-focused. A strong contender for a frontend-focused role.' },
];

const EmployerView: React.FC = () => {
  const [jobRole, setJobRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [matchedCandidates, setMatchedCandidates] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCandidates, setShowCandidates] = useState(false);
  
  const findCandidates = useCallback(() => {
    if (!jobRole.trim()) {
      setError('Job role is required.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setShowCandidates(true);

    // Simulate an API call and matching process
    setTimeout(() => {
      const candidatesForRole = MOCK_CANDIDATES.map(c => ({...c, role: jobRole}));
      setMatchedCandidates(candidatesForRole);
      setIsLoading(false);
    }, 1500);
  }, [jobRole]);
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
        <div className="text-center mb-6">
            <UserSearchIcon className="h-12 w-12 mx-auto text-indigo-500 mb-4" />
            <h2 className="text-3xl font-bold text-slate-800">Find Verified Talent</h2>
            <p className="text-slate-600">Describe your ideal candidate, and we'll show you top-scorers from our skill assessments.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <label htmlFor="jobRole" className="block text-sm font-medium text-slate-700 mb-1">Job Role</label>
            <input
              id="jobRole"
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="e.g., Product Manager"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="jobDescription" className="block text-sm font-medium text-slate-700 mb-1">Key Skills / Responsibilities</label>
            <textarea
              id="jobDescription"
              rows={2}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="e.g., Manages product lifecycle, user research, data analysis..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <div className="text-center mt-6">
            <button 
                onClick={findCandidates} 
                disabled={isLoading}
                className="px-10 py-3 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 transition-colors disabled:bg-slate-400"
            >
                {isLoading ? 'Searching...' : 'Find Top Candidates'}
            </button>
        </div>
      </div>
      
      {showCandidates && (
        <div className="animate-fade-in">
          {isLoading ? (
            <div className="text-center p-8"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div><p className="mt-4 text-slate-600">Matching candidates for {jobRole}...</p></div>
          ) : (
            <>
              <h3 className="text-2xl font-bold text-center mb-8">Top Candidates for {jobRole}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {matchedCandidates.map(candidate => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default EmployerView;