"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameRouter = void 0;
const express_1 = require("express");
const gameHelper_1 = require("../helper/gameHelper");
class GameRouter {
    constructor() {
        this.date = new Date().toJSON().slice(0, 10);
        this.addGame = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const newgame = request.body;
            try {
                const newGame = yield this.gameHelper.addGame(newgame);
                return response.status(200).json(newGame);
            }
            catch (error) {
                return response.status(400).json(error);
            }
        });
        this.ShowGameResults = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const user_id = request.params.user_id;
            try {
                const newGame = yield this.gameHelper.FindAllGameResult(this.date);
                return response.status(200).json(newGame);
            }
            catch (error) {
                return response.status(400).json(error);
            }
        });
        this.router = express_1.Router();
        this.gameHelper = new gameHelper_1.gameHeper();
    }
    routes(app) {
        app.route("/addgameresult").post(this.addGame);
        app.route("/gameresult").get(this.ShowGameResults);
    }
}
exports.GameRouter = GameRouter;
