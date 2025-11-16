import React from 'react';
import { ChartBarIcon, UsersIcon, RocketLaunchIcon, DataChartIcon, CreateQuizIcon, InviteIcon, ShortlistIcon, UserCircleIcon } from './icons';

interface LandingPageProps {
  onAuthClick: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAuthClick }) => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#0F172A] mb-6 tracking-tighter">
              Hire for real skills — not résumés
            </h1>
            <p className="text-lg text-slate-600 max-w-lg mx-auto md:mx-0 mb-8">
              Candidates complete 2-5 minute role quizzes. You get a ranked shortlist with explainable scores.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <button
                onClick={onAuthClick}
                className="px-8 py-3 bg-[#0F172A] text-white font-bold rounded-lg shadow-lg hover:bg-slate-800 transition-all duration-300 transform hover:-translate-y-1"
              >
                Post a job
              </button>
              <button
                onClick={onAuthClick}
                className="px-8 py-3 bg-teal-400 text-[#0F172A] font-bold rounded-lg shadow-lg hover:bg-teal-500 transition-all duration-300 transform hover:-translate-y-1"
              >
                Take a sample quiz
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center p-8 bg-teal-50 rounded-2xl aspect-square max-w-md mx-auto w-full">
             {/* Image placeholder */}
             <div className="w-full h-full bg-white rounded-lg shadow-xl flex items-center justify-center">
                <DataChartIcon className="w-3/5 h-3/5 text-teal-400 opacity-70" />
             </div>
          </div>
        </div>
      </section>

      {/* Why SkillMatch? Section */}
      <section id="features" className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why SkillMatch?</h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-12">
            Our platform is designed to make hiring faster, fairer, and more effective by focusing on what truly matters: a candidate's ability to do the job.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<UsersIcon className="h-8 w-8 text-teal-500" />}
              title="Bias-Free Hiring"
              description="Focus on objective, skill-based assessments to find the best talent, regardless of background."
            />
            <FeatureCard
              icon={<RocketLaunchIcon className="h-8 w-8 text-teal-500" />}
              title="Speed to Hire"
              description="Dramatically reduce time-to-hire with an efficient short list and instantly ranked shortlists."
            />
            <FeatureCard
              icon={<ChartBarIcon className="h-8 w-8 text-teal-500" />}
              title="Data-Driven Decisions"
              description="Make confident hiring choices with the help of explainable scores and detailed analytics."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Dashed line connector for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-1/2">
                <svg width="100%" height="2"><line x1="0" y1="1" x2="100%" y2="1" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8, 8"/></svg>
            </div>
            <HowItWorksCard
              icon={<CreateQuizIcon className="h-8 w-8 text-slate-700" />}
              step="1. Create Quiz"
              description="Build a custom, role-specific quiz in minutes using our library of vetted questions."
            />
            <HowItWorksCard
              icon={<InviteIcon className="h-8 w-8 text-slate-700" />}
              step="2. Invite Candidates"
              description="Share a unique link with applicants to have them take the short, engaging assessment."
            />
            <HowItWorksCard
              icon={<ShortlistIcon className="h-8 w-8 text-slate-700" />}
              step="3. Get Shortlist"
              description="Receive an instantly sorted shortlist of top-scoring candidates to interview."
            />
          </div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="bg-slate-50 py-16 md:py-24">
          <div className="container mx-auto px-4 text-center max-w-3xl">
              <blockquote className="text-2xl md:text-3xl font-medium text-slate-800 mb-8 leading-snug">
              "SkillMatch has completely transformed our hiring process. We're finding better candidates in a fraction of the time, and the focus on skills has led to a more diverse and talented team."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                  <UserCircleIcon className="h-14 w-14 text-slate-300" />
                  <div>
                      <p className="font-bold text-slate-800">Jane Doe</p>
                      <p className="text-slate-500">Head of Talent, Innovate Inc.</p>
                  </div>
              </div>
          </div>
      </section>
      
      {/* Final CTA Section */}
      <section className="bg-[#0F172A]">
        <div className="container mx-auto px-4 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Find your perfect match today</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">Join the growing number of companies revolutionizing their hiring process with skill-based assessments.</p>
            <button
                onClick={onAuthClick}
                className="px-8 py-3 bg-teal-400 text-[#0F172A] font-bold rounded-lg shadow-lg hover:bg-teal-500 transition-all duration-300 transform hover:-translate-y-1"
            >
                Get Started for Free
            </button>
        </div>
      </section>
    </>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-xl shadow-md text-left">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

const HowItWorksCard = ({ icon, step, description }: { icon: React.ReactNode, step: string, description: string }) => (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 z-10">
      <div className="flex items-center justify-center bg-slate-100 rounded-full w-16 h-16 mx-auto mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{step}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
);


export default LandingPage;
