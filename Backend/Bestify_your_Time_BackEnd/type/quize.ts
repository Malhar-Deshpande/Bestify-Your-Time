import { questions } from "./questions";
export interface quizze {
  quiz_name: string;
  quiz_time: number;
  quiz_category: number;
  questions: questions[];
}
