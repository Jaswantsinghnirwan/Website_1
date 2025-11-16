import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import JobSeekerView from './components/JobSeekerView';
import EmployerView from './components/EmployerView';
import LandingPage from './components/LandingPage';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import PricingPage from './components/PricingPage';
import { login, signup, logout, getCurrentUser } from './services/authService';
import type { User, Credentials } from './types';

type View = 'main' | 'pricing';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [view, setView] = useState<View>('main');

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    setView('main'); // Return to landing page on logout
  };

  const openSignupModal = useCallback(() => {
    setAuthError(null);
    setLoginOpen(false);
    setSignupOpen(true);
  }, []);
  
  const openLoginModal = useCallback(() => {
    setAuthError(null);
    setSignupOpen(false);
    setLoginOpen(true);
  }, []);

  const handleLogin = (credentials: Credentials): boolean => {
    try {
      const user = login(credentials.email, credentials.password);
      setCurrentUser(user);
      setLoginOpen(false);
      setAuthError(null);
      setView('main');
      return true;
    } catch (error) {
      setAuthError((error as Error).message);
      return false;
    }
  };

  const handleSignup = (user: Omit<User, 'id'>): boolean => {
    try {
      const newUser = signup(user.name, user.email, user.password, user.role);
      setCurrentUser(newUser);
      setSignupOpen(false);
      setAuthError(null);
      setView('main');
      return true;
    } catch (error) {
      setAuthError((error as Error).message);
      return false;
    }
  };

  const renderContent = () => {
    if (view === 'pricing') {
      return <PricingPage onGetStartedClick={openSignupModal} />;
    }
    
    if (currentUser) {
      switch (currentUser.role) {
        case 'seeker':
          return <JobSeekerView user={currentUser} />;
        case 'employer':
          return <EmployerView />;
        default:
          return <LandingPage onAuthClick={openSignupModal} />;
      }
    }
    return <LandingPage onAuthClick={openSignupModal} />;
  };
  
  const navigateTo = (newView: View) => {
    setView(newView);
    // If user is not logged in and not on landing, force them to landing.
    if (!currentUser && newView === 'main' && view !== 'main') {
        // This logic is mostly for returning from pricing to landing
    } else if (currentUser) {
        // If logged in, 'main' means their dashboard
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header 
        user={currentUser} 
        onLoginClick={openLoginModal}
        onSignupClick={openSignupModal}
        onLogoutClick={handleLogout}
        onNavigate={setView}
      />
      <main className="pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        {renderContent()}
      </main>
      <footer className="text-center py-6 bg-slate-100 text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} SkillMatch. All rights reserved.</p>
      </footer>

      {isLoginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          onLogin={handleLogin}
          onSwitchToSignup={openSignupModal}
          error={authError}
        />
      )}
      {isSignupOpen && (
        <SignupModal
          onClose={() => setSignupOpen(false)}
          onSignup={handleSignup}
          onSwitchToLogin={openLoginModal}
          error={authError}
        />
      )}
    </div>
  );
};

export default App;