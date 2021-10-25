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
exports.ResultHelper = void 0;
const resultModel_1 = require("../models/resultModel");
const usersModel_1 = require("../models/usersModel");
const quizModel_1 = require("../models/quizModel");
class ResultHelper {
    //Inserting  result to database
    SaveResult(result) {
        return __awaiter(this, void 0, void 0, function* () {
            this.delete(result.user_id, result.quiz_id);
            const myresult = yield resultModel_1.Result.create(result);
            return myresult;
        });
    }
    //showing result to user
    Showresult(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield resultModel_1.Result.findByPk(id);
            return result;
        });
    }
    //displaying top scorer of the day
    FindAllResult(date) {
        return __awaiter(this, void 0, void 0, function* () {
            const resultData = [];
            const allQuiz = yield resultModel_1.Result.findAll({
                where: { createdAt: date },
                order: [
                    ['obtained_marks', 'DESC'],
                ],
                include: [usersModel_1.User, quizModel_1.Quiz]
            });
            for (let i = 0; i < allQuiz.length; i++) {
                resultData.push({
                    obtained_marks: allQuiz[i].obtained_marks,
                    quiz_name: allQuiz[i].Quiz.quiz_name,
                    name: allQuiz[i].User.name,
                    createdAt: allQuiz[i].createdAt,
                });
            }
            return resultData;
        });
    }
    delete(user_id, quiz_id) {
        return __awaiter(this, void 0, void 0, function* () {
            resultModel_1.Result.destroy({
                where: {
                    user_id: user_id,
                    quiz_id: quiz_id
                }
            });
        });
    }
}
exports.ResultHelper = ResultHelper;
