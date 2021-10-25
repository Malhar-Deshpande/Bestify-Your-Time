"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizController = void 0;
const quizModel_1 = require("../models/quizModel");
const questionModel_1 = require("../models/questionModel");
class quizController {
    create(request, response) {
        const quiz = request.body;
        console.log(quiz);
        quizModel_1.Quiz.create({
            quiz_name: quiz["quizName"],
            quiz_time: quiz["quizTime"],
            quiz_category: quiz["quizCategory"],
        })
            .then((data) => {
            quiz.questions.forEach((element) => {
                element.quiz_id = data.quiz_id;
            });
            questionModel_1.Question.bulkCreate(quiz.questions)
                .then((data) => {
                response.status(200).json(data);
            })
                .catch((error) => console.log(error));
        })
            .catch((error) => console.log(error));
    }
    findQuiz(request, response) {
        quizModel_1.Quiz.findAll({
            where: {
                quiz_category: request.params.id
            }
        }).then((data) => {
            response.status(200).json(data);
            ;
        }).catch((error) => {
            response.status(400).json(error);
            ;
        });
    }
    findQuestion(request, response) {
        questionModel_1.Question.findAll({
            where: {
                quiz_id: request.params.id
            }
        }).then((data) => {
            response.status(200).json(data);
        }).catch((error) => {
            response.status(400).json(error);
        });
    }
    findAllQuiz(request, response) {
        quizModel_1.Quiz.findAll().then((data) => response.status(200).json(data)).
            catch((error) => response.status(500).json(error));
    }
}
exports.quizController = quizController;
