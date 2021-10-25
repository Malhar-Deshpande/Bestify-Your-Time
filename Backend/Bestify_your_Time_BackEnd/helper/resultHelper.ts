import { Request, response, Response } from 'express'
import { Result } from '../models/resultModel'
import { result } from '../type/result'
import app from '../app'
import { User } from '../models/usersModel'
import { Quiz } from '../models/quizModel'
export class ResultHelper {
     //Inserting  result to database
    async SaveResult(result: any) {
        this.delete(result.user_id, result.quiz_id)
        const myresult = await Result.create(result)
        return myresult
    }
    //showing result to user
    async Showresult(id: any) {
        const result = await Result.findByPk(id)
        return result;
    }

//displaying top scorer of the day
    async FindAllResult(date: any) {
        const resultData = [];
        const allQuiz: any[] = await Result.findAll({
            where: { createdAt: date },
            order: [
                ['obtained_marks', 'DESC'],
            ],
            include: [User, Quiz]
        })
        for (let i = 0; i < allQuiz.length; i++) {
            resultData.push({
                obtained_marks: allQuiz[i].obtained_marks,
                quiz_name: allQuiz[i].Quiz.quiz_name,
                name: allQuiz[i].User.name,
                createdAt: allQuiz[i].createdAt,
            })
        }
        return resultData;
    }
    
    async delete(user_id: any, quiz_id: any) {

        Result.destroy({
            where: {
                user_id: user_id,
                quiz_id: quiz_id
            }
        })

    }
}

