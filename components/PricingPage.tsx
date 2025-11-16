import React, { useState } from 'react';
import { CheckIcon } from './icons';

type PlanType = 'seeker' | 'employer';

interface PricingPageProps {
  onGetStartedClick: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onGetStartedClick }) => {
  const [planType, setPlanType] = useState<PlanType>('employer');

  const seekerPlans = [
    {
      name: 'Basic',
      price: '$0',
      frequency: '/ forever',
      description: 'Get started and see how you rank.',
      features: [
        '1 skill quiz per week',
        'Basic candidate profile',
        'Standard job matching',
      ],
      cta: 'Get Started for Free',
      primary: false,
    },
    {
      name: 'Pro',
      price: '$15',
      frequency: '/ month',
      description: 'Unlock your full potential and get noticed.',
      features: [
        'Unlimited skill quizzes',
        'Featured candidate profile',
        'Priority job matching',
        'Detailed quiz feedback reports',
      ],
      cta: 'Go Pro',
      primary: true,
    },
  ];

  const employerPlans = [
    {
      name: 'Starter',
      price: '$99',
      frequency: '/ month',
      description: 'Perfect for small teams and occasional hiring.',
      features: [
        '1 active job post',
        '50 candidate views per month',
        'Basic search filters',
        'AI-powered summaries',
      ],
      cta: 'Choose Starter',
      primary: false,
    },
    {
      name: 'Business',
      price: '$249',
      frequency: '/ month',
      description: 'The complete solution for growing companies.',
      features: [
        '5 active job posts',
        'Unlimited candidate views',
        'Advanced search & filtering',
        'Team collaboration features',
        'Priority support',
      ],
      cta: 'Choose Business',
      primary: true,
    },
     {
      name: 'Enterprise',
      price: 'Custom',
      frequency: '',
      description: 'Tailored solutions for large-scale hiring needs.',
      features: [
        'Unlimited job posts',
        'Dedicated account manager',
        'Custom integrations (ATS)',
        'Advanced security & compliance',
      ],
      cta: 'Contact Sales',
      primary: false,
    },
  ];
  
  const plans = planType === 'seeker' ? seekerPlans : employerPlans;

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#0F172A] mb-4">
          Choose the plan that's right for you
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
          Simple, transparent pricing for every stage of your journey.
        </p>

        <div className="flex justify-center mb-10">
          <div className="bg-slate-200 p-1 rounded-full flex items-center">
            <button
              onClick={() => setPlanType('employer')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${
                planType === 'employer' ? 'bg-white text-slate-800 shadow' : 'bg-transparent text-slate-600'
              }`}
            >
              For Employers
            </button>
            <button
              onClick={() => setPlanType('seeker')}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${
                planType === 'seeker' ? 'bg-white text-slate-800 shadow' : 'bg-transparent text-slate-600'
              }`}
            >
              For Job Seekers
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-8 rounded-2xl border text-left flex flex-col ${
                plan.primary ? 'bg-[#0F172A] text-white border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <h3 className={`text-xl font-bold ${plan.primary ? 'text-white' : 'text-slate-800'}`}>{plan.name}</h3>
              <p className={`mt-2 text-sm ${plan.primary ? 'text-slate-300' : 'text-slate-500'}`}>{plan.description}</p>
              <div className={`my-6 ${plan.primary ? 'text-white' : 'text-slate-800'}`}>
                <span className="text-5xl font-extrabold">{plan.price}</span>
                <span className={`text-lg font-medium ${plan.primary ? 'text-slate-300' : 'text-slate-500'}`}>{plan.frequency}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckIcon className={`h-6 w-6 flex-shrink-0 ${plan.primary ? 'text-teal-400' : 'text-indigo-600'}`} />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={onGetStartedClick}
                className={`w-full py-3 mt-auto font-bold rounded-lg transition-transform transform hover:-translate-y-1 ${
                  plan.primary ? 'bg-teal-400 text-[#0F172A] hover:bg-teal-300' : 'bg-white text-slate-800 hover:bg-slate-200 shadow-sm'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
