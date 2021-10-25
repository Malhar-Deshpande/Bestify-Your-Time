export interface IuserResponse{
    question_id:number;
    quiz_id:number;
    selected_ans:string;
    user_id:number;
    correct_ans:string;
    quize_time:number;
    remaining_time:number;
    status:string;
    res_id:number;
    
}

export interface IQuestion{
    //user_id:number;
    question_id:number
    question:string
    choice1:string
    choice2:string
    choice3:string
    choice4:string
    answer:string
    quiz_id:number
    //selected_ans:string;
    //status:string;
}

export interface IScoreCard{
    user_id:number;
    quiz_id:number;
    obtained_marks:number;
    total_marks:number;

}
