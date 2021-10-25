import { Game } from "../models/gameModel";
import { User } from "../models/usersModel";

export class gameHeper {
    //Inserting Game result to databse
    async addGame(game: any) {

        const newgame = await Game.create(game)
        return newgame;
    }


    //displaying all game result to users
    async FindAllGameResult(date: any) {
        const resultData = [];
        const allQuiz: any[] = await Game.findAll({
            where: { createdAt: date },
            order: [
                ['score', 'DESC'],
            ],
            include: [User]
        })
        for (let i = 0; i < allQuiz.length; i++) {
            resultData.push({
                score: allQuiz[i].score,
                game_name: allQuiz[i].game_name,
                name: allQuiz[i].User.name,
                createdAt: allQuiz[i].createdAt,
            })
        }
        return resultData;
    }



}