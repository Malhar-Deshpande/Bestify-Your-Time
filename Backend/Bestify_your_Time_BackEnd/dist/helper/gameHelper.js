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
exports.gameHeper = void 0;
const gameModel_1 = require("../models/gameModel");
const usersModel_1 = require("../models/usersModel");
class gameHeper {
    //Inserting Game result to databse
    addGame(game) {
        return __awaiter(this, void 0, void 0, function* () {
            const newgame = yield gameModel_1.Game.create(game);
            return newgame;
        });
    }
    //displaying all game result to users
    FindAllGameResult(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultData = [];
            const allQuiz = yield gameModel_1.Game.findAll({
                where: { createdAt: date },
                order: [
                    ['score', 'DESC'],
                ],
                include: [usersModel_1.User]
            });
            for (let i = 0; i < allQuiz.length; i++) {
                resultData.push({
                    score: allQuiz[i].score,
                    game_name: allQuiz[i].game_name,
                    name: allQuiz[i].User.name,
                    createdAt: allQuiz[i].createdAt,
                });
            }
            return resultData;
        });
    }
}
exports.gameHeper = gameHeper;
