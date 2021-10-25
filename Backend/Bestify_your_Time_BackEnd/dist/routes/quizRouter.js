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
exports.quizRouter = void 0;
const express_1 = require("express");
const quizHelper_1 = require("../helper/quizHelper");
class quizRouter {
    constructor() {
        this.saveQuiz = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const quiz = request.body;
            const ques = request.body.questions;
            const quizes = {
                quiz_name: quiz["quizName"],
                quiz_time: quiz["quizTime"],
                quiz_category: quiz["quizCategory"]
            };
            try {
                const quize = yield this.quizHelper.createQuiz(quizes);
                try {
                    quiz.questions.forEach((element) => {
                        element.quiz_id = quize.quiz_id;
                    });
                    const question = yield this.quizHelper.createQuestion(quiz.questions);
                    return response.status(200).json(question);
                }
                catch (error) {
                    yield this.quizHelper.deleteQuiz(quize.quiz_id);
                    return response.status(400).json(error);
                }
            }
            catch (error) {
                return response.status(400).json(error);
            }
        });
        this.findAllQuiz = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newData = yield this.quizHelper.findAllQuiz();
                return response.status(200).send(newData);
            }
            catch (error) {
                console.log(error);
                return response.status(400).send(error);
            }
        });
        this.findQuiz = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            try {
                const newData = yield this.quizHelper.findQuiz(id);
                return response.status(200).send(newData);
            }
            catch (error) {
                console.log(error);
                return response.status(400).send(error);
            }
        });
        this.findQuizById = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            try {
                const newData = yield this.quizHelper.findQuizByPK(id);
                return response.status(200).send(newData);
            }
            catch (error) {
                console.log(error);
                return response.status(400).send(error);
            }
        });
        this.findQuestion = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const id = request.params.id;
            try {
                const newData = yield this.quizHelper.findQuestions(id);
                return response.status(200).send(newData);
            }
            catch (error) {
                console.log(error);
                return response.status(400).send(error);
            }
        });
        this.router = express_1.Router();
        this.quizHelper = new quizHelper_1.quizHelper();
        this.routes;
    }
    routes(app) {
        app.route("/quiz").post(this.saveQuiz);
        app.route("/quiz/:id").get(this.findQuiz);
        app.route("/all-quiz").get(this.findAllQuiz);
        app.route("/question/:id").get(this.findQuestion);
        app.route("/quizbypk/:id").get(this.findQuizById);
    }
}
exports.quizRouter = quizRouter;
