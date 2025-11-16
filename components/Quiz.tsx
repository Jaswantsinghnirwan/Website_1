
import React, { useState } from 'react';
import type { QuizQuestion } from '../types';

interface QuizProps {
  role: string;
  questions: QuizQuestion[];
  onSubmit: (answers: string[]) => void;
}

const Quiz: React.FC<QuizProps> = ({ role, questions, onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(''));
  
  const handleAnswerChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(answers);
  };
  
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const currentAnswer = answers[currentQuestionIndex]?.trim();

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg animate-fade-in">
        <div className="mb-6">
            <p className="text-sm font-semibold text-blue-600">Quiz for: {role}</p>
            <div className="mt-4 w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}></div>
            </div>
            <p className="text-right text-sm text-slate-500 mt-1">Question {currentQuestionIndex + 1} of {questions.length}</p>
            <h3 className="text-xl font-bold text-slate-800 mt-4">{questions[currentQuestionIndex].question}</h3>
        </div>

        <textarea
            value={answers[currentQuestionIndex]}
            onChange={handleAnswerChange}
            rows={8}
            className="w-full p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            placeholder="Your answer here..."
        />
        
        <div className="mt-6 flex justify-between items-center gap-4">
            <button 
                onClick={handlePrev} 
                disabled={currentQuestionIndex === 0}
                className="px-6 py-2 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Previous
            </button>
            
            {!isLastQuestion && (
                <button 
                    onClick={handleNext}
                    disabled={!currentAnswer}
                    className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                >
                    Next
                </button>
            )}
            {isLastQuestion && (
                <button 
                    onClick={handleSubmit} 
                    disabled={!currentAnswer}
                    className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:bg-green-300"
                >
                    Submit Quiz
                </button>
            )}
        </div>
    </div>
  );
};

export default Quiz;