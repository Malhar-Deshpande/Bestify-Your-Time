import {IMcqQuestionFormat} from './mcq-question-format'

export interface IMcqQuestion {
    quiz_id:number;
    quiz_name:string
    quizTime:number 
    quizCategory:number
    questions:IMcqQuestionFormat[]
}