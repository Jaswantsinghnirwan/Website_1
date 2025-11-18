

import { GoogleGenAI, Type } from "@google/genai";
import type { QuizQuestion, QuizEvaluation } from '../types';
import { OFFLINE_QUESTIONS } from './quizData';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuiz = async (role: string): Promise<QuizQuestion[]> => {
  try {
    const primaryTag = role.toLowerCase();
    const questionsForRole = OFFLINE_QUESTIONS.filter(q => q.tags.includes(primaryTag));

    if (questionsForRole.length < 10) {
      console.warn(`Not enough specific questions for role "${role}". Found ${questionsForRole.length}.`);
      // Fallback for roles that might not have a direct tag match.
      const genericEngineering = OFFLINE_QUESTIONS.filter(q => q.tags.includes('engineering'));
      if (role.toLowerCase().includes('developer') && genericEngineering.length >= 10) {
        const shuffled = genericEngineering.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 10).map(q => ({ question: q.question }));
      }
      throw new Error(`Could not find at least 10 questions for the role: ${role}.`);
    }

    const shuffled = questionsForRole.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 10).map(q => ({ question: q.question }));
    
    return selectedQuestions;
  } catch (error) {
    console.error("Error generating offline quiz:", error);
    throw new Error("Failed to load the skill quiz. Please select another role or try again later.");
  }
};


export const evaluateAnswers = async (role: string, questions: QuizQuestion[], answers: string[]): Promise<QuizEvaluation> => {
  const questionsAndAnswers = questions.map((q, i) => 
    `Question ${i + 1}: ${q.question}\nAnswer ${i + 1}: ${answers[i] || 'No answer provided.'}`
  ).join('\n\n');

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `You are an expert hiring manager and career coach evaluating a candidate's skill quiz for a "${role}" position. Here are the questions and the candidate's answers:\n\n${questionsAndAnswers}\n\nBased on these answers, provide a comprehensive evaluation including:\n1. A percentage score (from 0 to 100).\n2. A brief summary of their strengths and potential weaknesses.\n3. A list of 2-3 specific areas for improvement.\n4. An estimated probability of getting an interview ('Low', 'Medium', 'High') based on this performance for this role.\n5. A list of 2-3 other job titles they might be a good fit for based on their demonstrated skills.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.NUMBER,
              description: 'A percentage score from 0 to 100.'
            },
            summary: {
              type: Type.STRING,
              description: 'A brief summary of the candidate\'s performance.'
            },
            improvementAreas: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'A list of specific areas for improvement.'
            },
            interviewProbability: {
                type: Type.STRING,
                description: 'An estimated interview probability: "Low", "Medium", or "High".'
            },
            suggestedJobTitles: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'A list of other relevant job titles.'
            }
          },
          required: ['score', 'summary', 'improvementAreas', 'interviewProbability', 'suggestedJobTitles']
        }
      }
    });

    const jsonText = response.text.trim();
    const evaluationData = JSON.parse(jsonText);
    
    // Basic validation
    if (typeof evaluationData.score === 'number' && typeof evaluationData.summary === 'string' && Array.isArray(evaluationData.improvementAreas)) {
        return evaluationData;
    }
    throw new Error('Invalid evaluation data structure received from API.');
  } catch (error) {
    console.error("Error evaluating answers:", error);
    throw new Error("Failed to evaluate answers. Please try again.");
  }
};