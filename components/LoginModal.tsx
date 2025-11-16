import React, { useState } from 'react';
import type { Credentials } from '../types';
import { LogoIcon } from './icons';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (credentials: Credentials) => boolean;
  onSwitchToSignup: () => void;
  error: string | null;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin, onSwitchToSignup, error }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const success = onLogin({ email, password });
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
          <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
          <p className="text-slate-500">Log in to find your perfect match.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              placeholder="••••••••"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center bg-red-50 p-3 rounded-lg">{error}</p>}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 transition-colors disabled:bg-slate-400"
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
        
        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{' '}
          <button onClick={onSwitchToSignup} className="font-semibold text-indigo-600 hover:underline">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
