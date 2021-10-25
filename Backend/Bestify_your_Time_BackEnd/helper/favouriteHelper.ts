import { Request, response, Response } from 'express'
import { Favourite } from '../models/fovouriteModel'
import { favourite } from '../type/favourite'
import app from '../app'
import { Quiz } from '../models/quizModel'
export class favouriteHelper {

    //Inserting user fav quiz to database
    async AddTOFav(fav: any) {
        const newfav = await Favourite.create(fav)
        return newfav;
    }
    //displaying all data to user
    async getAllFav(id: any) {
        const newarray = []
        const allfav: any = await Favourite.findAll({
            where: { user_id: id },
            include: [Quiz]
        })
        for (let i = 0; i < allfav.length; i++) {
            newarray.push({
                quiz_name: allfav[i].Quiz.quiz_name,
                quiz_time: allfav[i].Quiz.quiz_time,
            })
        }
        return newarray;
    }

    async delete(id: any) {
        const deletefav: any = await Favourite.destroy({
            where: {
                fav_id: id
            }
        })

        return deletefav;

    }
}
