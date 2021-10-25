import { questions } from "./questions";
export interface quizzes {
  quizId: number;
  quizName: string;
  quizTime: number;
  quizCategory: number;
  questions: questions[];
}
