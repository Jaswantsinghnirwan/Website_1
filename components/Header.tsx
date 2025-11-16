import React, { useState, useEffect, useRef } from 'react';
import { LogoIcon, BellIcon, ChevronDownIcon } from './icons';
import type { User } from '../types';

interface HeaderProps {
  user: User | null;
  onLoginClick: () => void;
  onSignupClick: () => void;
  onLogoutClick: () => void;
  onNavigate: (view: 'main' | 'pricing') => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onSignupClick, onLogoutClick, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleScrollTo = (id: string) => {
    // Ensure we are on the main view before trying to scroll
    onNavigate('main');
    // A small timeout allows the view to potentially re-render before scrolling
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  };
  
  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className="bg-white/90 backdrop-blur-lg shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <button onClick={() => onNavigate('main')} className="flex items-center gap-2 text-2xl font-bold text-slate-800">
          <LogoIcon className="h-8 w-8 text-blue-600" />
          <span className="hidden sm:inline">SkillMatch</span>
        </button>
        
        {user ? (
          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-slate-800">
              <BellIcon className="h-6 w-6" />
            </button>
            <div className="w-px h-6 bg-slate-200 hidden sm:block"></div>
            
            {/* User Dropdown */}
            <div className="relative" ref={menuRef}>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-2 cursor-pointer">
                 <img className="h-9 w-9 rounded-full" src={`https://api.dicebear.com/8.x/initials/svg?seed=${user.name}`} alt="avatar" />
                 <div className="hidden sm:block text-left">
                    <p className="font-semibold text-sm text-slate-800">{user.name}</p>
                    <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                 </div>
                 <ChevronDownIcon className={`h-5 w-5 text-slate-500 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-40 border border-slate-200 animate-fade-in-up-sm">
                  <div className="px-4 py-2 border-b border-slate-200 mb-2">
                     <p className="font-semibold text-sm text-slate-800 truncate">{user.name}</p>
                     <p className="text-xs text-slate-500 truncate">{user.email}</p>
                  </div>
                  <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors">Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 transition-colors">Settings</a>
                  <div className="border-t border-slate-200 my-2"></div>
                  <button 
                      onClick={() => {
                        onLogoutClick();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:font-semibold transition-all"
                  >
                      Log Out
                  </button>
                </div>
              )}
            </div>

          </div>
        ) : (
          <>
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => handleScrollTo('features')} className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                For Employers
              </button>
              <button onClick={() => handleScrollTo('features')} className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                For Candidates
              </button>
              <button onClick={() => onNavigate('pricing')} className="text-slate-600 hover:text-slate-900 font-medium transition-colors">
                Pricing
              </button>
            </nav>
            <div className="flex items-center gap-4">
                <button 
                  onClick={onLoginClick} 
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  Log In
                </button>
                <button 
                  onClick={onSignupClick}
                  className="px-5 py-2 bg-[#0F172A] text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Sign Up
                </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;