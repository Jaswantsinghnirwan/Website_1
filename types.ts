export interface QuizQuestion {
  question: string;
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  score: number;
  summary: string;
}

export type UserRole = 'seeker' | 'employer';

export interface User {
    id: string;
    name: string;
    email: string;
    password: string; // In a real app, this would be a hash
    role: UserRole;
}

export type Credentials = Pick<User, 'email' | 'password'>;

export interface QuizEvaluation {
  score: number;
  summary: string;
  improvementAreas: string[];
  interviewProbability: string;
  suggestedJobTitles: string[];
}
