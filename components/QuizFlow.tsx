import React, { useState, useEffect } from 'react';
import Quiz from './Quiz';
import { generateQuiz, evaluateAnswers } from '../services/geminiService';
import type { QuizQuestion, QuizEvaluation } from '../types';
import { LightBulbIcon, TargetIcon, TrendingUpIcon } from './icons';


interface QuizFlowProps {
    role: string;
    onComplete: (role: string, score: number, summary: string) => void;
    onBack: () => void;
}

type QuizState = 'loading' | 'taking' | 'evaluating' | 'result' | 'error';

const QuizFlow: React.FC<QuizFlowProps> = ({ role, onComplete, onBack }) => {
    const [quizState, setQuizState] = useState<QuizState>('loading');
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [evaluation, setEvaluation] = useState<QuizEvaluation | null>(null);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                setQuizState('loading');
                const quizQuestions = await generateQuiz(role);
                if (quizQuestions.length === 0) throw new Error("The AI failed to generate questions. Please try another role.");
                setQuestions(quizQuestions);
                setQuizState('taking');
            } catch (err) {
                setError((err as Error).message);
                setQuizState('error');
            }
        };
        fetchQuiz();
    }, [role]);

    const handleSubmit = async (answers: string[]) => {
        try {
            setQuizState('evaluating');
            const result = await evaluateAnswers(role, questions, answers);
            setEvaluation(result);
            setQuizState('result');
        } catch (err) {
            setError((err as Error).message);
            setQuizState('error');
        }
    };
    
    const handleFinish = () => {
        if(evaluation) {
            onComplete(role, evaluation.score, evaluation.summary);
        }
    }

    if (quizState === 'loading') {
        return (
            <div className="text-center p-8 max-w-lg mx-auto">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-slate-600 font-semibold text-lg">Generating your quiz for {role}...</p>
                <p className="text-slate-500 mt-2">The AI is crafting questions to test your skills. This may take a moment.</p>
            </div>
        );
    }
    
    if (quizState === 'evaluating') {
        return (
            <div className="text-center p-8 max-w-lg mx-auto">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-4 text-slate-600 font-semibold text-lg">Evaluating your answers...</p>
                <p className="text-slate-500 mt-2">Our AI is reviewing your submission to provide a detailed evaluation.</p>
            </div>
        );
    }

    if (quizState === 'error') {
        return (
            <div className="text-center p-8 max-w-lg mx-auto bg-white rounded-lg shadow-lg border border-red-200">
                <h3 className="text-xl font-bold text-red-600">Something went wrong</h3>
                <p className="text-slate-600 my-4 bg-red-50 p-3 rounded-md">{error}</p>
                <button onClick={onBack} className="px-6 py-2 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-800">
                    Back to Dashboard
                </button>
            </div>
        );
    }

    if (quizState === 'result' && evaluation) {
        const prob = evaluation.interviewProbability?.toLowerCase();
        const probColor = prob === 'high' ? 'text-green-600 bg-green-100' : prob === 'medium' ? 'text-amber-600 bg-amber-100' : 'text-red-600 bg-red-100';

        return (
            <div className="max-w-4xl mx-auto animate-fade-in">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-slate-800">Quiz Complete!</h2>
                    <p className="text-slate-600 mb-6">Here's your result for the {role} assessment.</p>
                    <div className={`flex items-center justify-center font-extrabold text-6xl rounded-full w-40 h-40 mx-auto my-6 ${evaluation.score >= 75 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {evaluation.score}%
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-slate-700 mb-2">AI-Powered Skill Summary:</p>
                        <p className="text-slate-600 bg-slate-100/70 p-4 rounded-md text-sm text-left">
                            {evaluation.summary}
                        </p>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <TrendingUpIcon className="h-6 w-6 text-indigo-500"/>
                            <h4 className="font-bold text-slate-800">Interview Outlook</h4>
                        </div>
                        <p className="text-sm text-slate-500 mb-3">Based on your score, your chances of landing an interview for a {role} role are:</p>
                        <span className={`px-3 py-1 text-sm font-bold rounded-full ${probColor}`}>{evaluation.interviewProbability}</span>
                    </div>
                     <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="flex items-center gap-3 mb-3">
                            <TargetIcon className="h-6 w-6 text-indigo-500"/>
                            <h4 className="font-bold text-slate-800">Potential Roles</h4>
                        </div>
                        <p className="text-sm text-slate-500 mb-3">Your skills also make you a good fit for:</p>
                        <div className="flex flex-wrap gap-2">
                            {evaluation.suggestedJobTitles.map(title => (
                                <span key={title} className="px-3 py-1 text-sm font-semibold rounded-full bg-slate-200 text-slate-700">{title}</span>
                            ))}
                        </div>
                    </div>
                     <div className="bg-white p-6 rounded-xl shadow-lg md:col-span-3">
                        <div className="flex items-center gap-3 mb-3">
                             <LightBulbIcon className="h-6 w-6 text-indigo-500"/>
                            <h4 className="font-bold text-slate-800">Key Improvement Areas</h4>
                        </div>
                        <ul className="space-y-2 text-sm text-slate-600 list-disc list-inside">
                            {evaluation.improvementAreas.map((area) => <li key={area}>{area}</li>)}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button onClick={handleFinish} className="w-full max-w-xs py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    if (quizState === 'taking') {
        return <Quiz questions={questions} onSubmit={handleSubmit} role={role} />;
    }

    return null; 
};

export default QuizFlow;
