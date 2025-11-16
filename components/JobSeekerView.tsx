import React, { useState, useMemo } from 'react';
import type { User } from '../types';
import { SearchIcon } from './icons';
import QuizFlow from './QuizFlow';

interface JobSeekerViewProps {
  user: User;
}

interface Scorecard {
  role: string;
  score: number;
  date: string;
}

const ROLES = [
  {
    title: 'Frontend Developer',
    category: 'Engineering',
    description: 'Assess your skills in React, TypeScript, and modern CSS frameworks to build beautiful and performant user interfaces.',
  },
  {
    title: 'Data Scientist',
    category: 'Data Science',
    description: 'Test your knowledge in Python, SQL, machine learning algorithms, and statistical analysis to solve complex data problems.',
  },
  {
    title: 'Product Manager',
    category: 'Product',
    description: 'Demonstrate your expertise in product strategy, user research, roadmap planning, and agile methodologies.',
  },
  {
    title: 'UI/UX Designer',
    category: 'Design',
    description: 'Showcase your design thinking, wireframing, prototyping, and user testing skills with industry-standard tools.',
  },
  {
    title: 'Backend Engineer',
    category: 'Engineering',
    description: 'Prove your proficiency in server-side languages, database management, and API design for scalable applications.',
  },
  {
    title: 'DevOps Engineer',
    category: 'Engineering',
    description: 'Validate your skills in CI/CD, cloud infrastructure, containerization, and automation tools like Docker and Kubernetes.',
  },
];

const CATEGORIES = ['All', 'Engineering', 'Design', 'Product', 'Data Science'];

const JobSeekerView: React.FC<JobSeekerViewProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeQuizRole, setActiveQuizRole] = useState<string | null>(null);
  const [scorecards, setScorecards] = useState<Scorecard[]>([
    {
      role: 'DevOps Engineer',
      score: 92,
      date: 'May 12',
    },
    {
      role: 'Mobile Developer',
      score: 85,
      date: 'Apr 28',
    },
  ]);

  const filteredRoles = useMemo(() => {
    return ROLES.filter(role => {
      const matchesCategory = activeCategory === 'All' || role.category === activeCategory;
      const matchesSearch = role.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);

  const handleStartQuiz = (roleTitle: string) => {
    setActiveQuizRole(roleTitle);
  };

  const handleQuizComplete = (role: string, score: number, summary: string) => {
    const newScorecard: Scorecard = {
      role,
      score,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    };
    setScorecards(prev => [newScorecard, ...prev]);
    setActiveQuizRole(null);
  };
  
  if (activeQuizRole) {
    return (
      <QuizFlow 
        role={activeQuizRole} 
        onComplete={handleQuizComplete}
        onBack={() => setActiveQuizRole(null)}
      />
    );
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-slate-800">Welcome, {user.name.split(' ')[0]}!</h1>
          <p className="text-slate-600 mt-1">Find your perfect role by proving your skills.</p>
          
          <div className="mt-6 p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-slate-600 mb-2">Search for a role or browse categories below to get started.</p>
            <div className="relative mb-3">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="text"
                placeholder="Search for a role, e.g., 'Frontend Developer'"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(category => (
                <button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-colors ${activeCategory === category ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRoles.map(role => (
              <div key={role.title} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col">
                <h3 className="font-bold text-lg text-slate-800">{role.title}</h3>
                <p className="text-slate-600 text-sm mt-2 mb-4 flex-grow">{role.description}</p>
                <button 
                  onClick={() => handleStartQuiz(role.title)}
                  className="w-full mt-auto py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Quiz
                </button>
              </div>
            ))}
             {filteredRoles.length === 0 && (
              <div className="md:col-span-2 text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-slate-500">No roles found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6 mt-8 lg:mt-0">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">In Progress</h3>
            <div className="flex justify-between items-center opacity-60">
              <div>
                <p className="font-semibold text-slate-700">Backend Engineer</p>
                <p className="text-sm text-slate-500">Quiz started 2 days ago</p>
              </div>
              <button className="px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full hover:bg-blue-200 cursor-not-allowed">Continue</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4">Completed Scorecards</h3>
            <div className="space-y-4">
              {scorecards.length > 0 ? scorecards.map((card) => (
                <div key={card.role + card.date} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-slate-700">{card.role}</p>
                    <p className="text-sm text-slate-500">Completed on {card.date}</p>
                  </div>
                   <div className={`font-bold text-2xl ${card.score >= 75 ? 'text-green-600' : 'text-amber-600'}`}>
                    {card.score}
                    <span className="text-sm text-slate-500 font-medium"> / 100</span>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-slate-500 text-center py-4">You haven't completed any quizzes yet.</p>
              )}
            </div>
            {scorecards.length > 0 && (
                <button className="text-sm font-semibold text-blue-600 mt-4 hover:underline">View All Scorecards</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerView;
