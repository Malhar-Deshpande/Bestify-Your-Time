import { IMcqQuestionFormat } from "./mcq-question-format";

export interface IBrainTeaser {
    quizName:string
    quizCategory:number
    quizTime:number
    questions:IMcqQuestionFormat[];
}