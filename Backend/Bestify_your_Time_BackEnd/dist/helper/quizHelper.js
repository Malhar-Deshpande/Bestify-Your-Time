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
exports.quizHelper = void 0;
const quizModel_1 = require("../models/quizModel");
const questionModel_1 = require("../models/questionModel");
class quizHelper {
    //Inserting Quizzes to datbase
    createQuiz(quiz) {
        return __awaiter(this, void 0, void 0, function* () {
            const newQuiz = yield quizModel_1.Quiz.create(quiz);
            return newQuiz;
        });
    }
    //delete quiz by quizId
    deleteQuiz(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield quizModel_1.Quiz.destroy({
                where: {
                    quiz_id: id
                }
            });
        });
    }
    //Inserting Questions to database
    createQuestion(question) {
        return __awaiter(this, void 0, void 0, function* () {
            const newQuestions = yield questionModel_1.Question.bulkCreate(question);
            return newQuestions;
        });
    }
    //displaying all questions to user
    findAllQuestions(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const allQuiz = yield quizModel_1.Quiz.findAll({
                where: { quiz_category: id },
                include: [{
                        model: questionModel_1.Question,
                    }]
            });
            return allQuiz;
        });
    }
    //inserting All Quizes With questions into the database
    createQuizWithQuestions(quiz) {
        return __awaiter(this, void 0, void 0, function* () {
            const newQuiz = yield quizModel_1.Quiz.create({
                quiz_name: quiz.quizName,
                quiz_time: quiz.quizTime,
                quiz_category: quiz.quizCategory,
                questions: quiz.questions
            }, {
                include: questionModel_1.Question
            });
            return newQuiz;
        });
    }
    findAllQuiz() {
        return __awaiter(this, void 0, void 0, function* () {
            const allQuiz = yield quizModel_1.Quiz.findAll();
            return allQuiz;
        });
    }
    findQuiz(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const allQuiz = yield quizModel_1.Quiz.findAll({
                where: { quiz_category: id }
            });
            return allQuiz;
        });
    }
    findQuizByPK(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const allQuiz = yield quizModel_1.Quiz.findByPk(id);
            return allQuiz;
        });
    }
    findQuestions(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const allQuestion = yield questionModel_1.Question.findAll({
                where: { quiz_id: id }
            });
            return allQuestion;
        });
    }
}
exports.quizHelper = quizHelper;
