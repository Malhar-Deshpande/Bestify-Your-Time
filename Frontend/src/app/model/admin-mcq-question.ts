import {IMcqQuestionFormat} from './mcq-question-format'

export interface IAdminMcqQuestion {
    quizName:string
    quizTime:number 
    quizCategory:number
    questions:IMcqQuestionFormat[]
}