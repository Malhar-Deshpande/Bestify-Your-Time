import { Request, Response } from 'express'
import { ResponseData } from '../models/responseModel'
import { responseData } from '../type/response'
import app from '../app'


export class responseHelper {

    //Inserting response to database
    async create(newResponse: responseData[]) {
        this.delete(newResponse[0].user_id, newResponse[0].quiz_id)
        const data = await ResponseData.bulkCreate<ResponseData>(newResponse)
        return data;
    }
      //showing all quizzes
      async find(user_id:any,quiz_id:any){
        const allResponse= await ResponseData.findAll({
            where:{
                user_id:user_id,
                quiz_id:quiz_id
            }
        })

        return allResponse;
    }


    async delete(user_id: any, quiz_id: any) {
        ResponseData.destroy({
            where: {
                user_id: user_id,
                quiz_id: quiz_id
            }
        })

    }



}