import React, { useState } from 'react';
import type { User, UserRole } from '../types';
import { LogoIcon } from './icons';

interface SignupModalProps {
  onClose: () => void;
  onSignup: (user: Omit<User, 'id'>) => boolean;
  onSwitchToLogin: () => void;
  error: string | null;
}

const SignupModal: React.FC<SignupModalProps> = ({ onClose, onSignup, onSwitchToLogin, error }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('seeker');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = onSignup({ name, email, password, role });
    if (!success) {
      setIsLoading(false);
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-8 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">&times;</button>
        <div className="text-center mb-6">
          <LogoIcon className="h-10 w-10 text-[#0F172A] mx-auto mb-2" />
          <h2 className="text-2xl font-bold text-slate-800">Create Your Account</h2>
          <p className="text-slate-500">Join SkillMatch to get started.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="signup-name" className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="e.g., Jane Doe"
            />
          </div>
          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="6+ characters"
            />
          </div>
          
          <div>
            <span className="block text-sm font-medium text-slate-700 mb-2">I am a...</span>
            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() => setRole('seeker')}
                    className={`px-4 py-3 text-sm font-semibold rounded-lg border-2 transition-colors ${role === 'seeker' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}
                >
                    Job Seeker
                </button>
                <button
                    type="button"
                    onClick={() => setRole('employer')}
                    className={`px-4 py-3 text-sm font-semibold rounded-lg border-2 transition-colors ${role === 'employer' ? 'bg-indigo-50 border-indigo-500 text-indigo-700' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'}`}
                >
                    Employer
                </button>
            </div>
          </div>
          
          {error && <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">{error}</p>}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-teal-400 text-[#0F172A] font-bold rounded-lg hover:bg-teal-500 transition-colors disabled:bg-teal-200"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="font-semibold text-indigo-600 hover:underline">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;