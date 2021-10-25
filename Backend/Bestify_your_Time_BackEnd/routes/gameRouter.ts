import { NextFunction, Request, Response, Router } from "express";
import sequelize from "sequelize";
import { gameHeper } from "../helper/gameHelper";
import { game } from "../type/game";
import * as express from 'express'

export class GameRouter {
    public router: Router;
    public gameHelper: gameHeper;
    public date = new Date().toJSON().slice(0, 10);
    constructor() {
        this.router = Router();
        this.gameHelper = new gameHeper();
    }



    addGame: any = async (request: Request,
        response: Response,
        next: NextFunction) => {

        const newgame: any = request.body
        try {

            const newGame = await this.gameHelper.addGame(newgame)
            return response.status(200).json(newGame)
        } catch (error) {
            return response.status(400).json(error)
        }
    }


    ShowGameResults: any = async (request: Request,
        response: Response,
        next: NextFunction) => {
        const user_id = request.params.user_id

        try {
            const newGame = await this.gameHelper.FindAllGameResult(this.date)
            return response.status(200).json(newGame)
        } catch (error) {
            return response.status(400).json(error)
        }
    }




    routes(app: express.Application) {
        app.route("/addgameresult").post(this.addGame)
        app.route("/gameresult").get(this.ShowGameResults)
    }


}
