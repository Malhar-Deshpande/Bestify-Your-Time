import { Request, Response, Application, Router, request, NextFunction, response } from 'express'
import App from '../app';
import { quizHelper } from '../helper/quizHelper';
import { quizzes } from '../type/quizzes';
import { questions } from '../type/questions';
import { quizze } from '../type/quize';

export class quizRouter {
    public router: Router;
    public quizHelper: quizHelper;
    constructor() {
        this.router = Router();
        this.quizHelper = new quizHelper();
        this.routes;
    }


    saveQuiz: any = async (request: Request, response: Response, next: NextFunction) => {
        const quiz: quizzes = request.body;
        const ques: questions[] = request.body.questions;

        const quizes: any = {
            quiz_name: quiz["quizName"],
            quiz_time: quiz["quizTime"],
            quiz_category: quiz["quizCategory"]
        }
        try {
            const quize = await this.quizHelper.createQuiz(quizes);
            try {

                quiz.questions.forEach((element) => {
                    element.quiz_id = quize.quiz_id;
                });
                const question: questions[] = await this.quizHelper.createQuestion(quiz.questions);
                return response.status(200).json(question)
            } catch (error) {
                await this.quizHelper.deleteQuiz(quize.quiz_id)
                return response.status(400).json(error)
            }
        } catch (error) {
            return response.status(400).json(error)

        }
    }

    findAllQuiz: any = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const newData = await this.quizHelper.findAllQuiz()
            return response.status(200).send(newData)
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }

    findQuiz: any = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try {
            const newData = await this.quizHelper.findQuiz(id)
            return response.status(200).send(newData)
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }
    findQuizById: any = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try {
            const newData = await this.quizHelper.findQuizByPK(id)
            return response.status(200).send(newData)
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }
    findQuestion: any = async (request: Request, response: Response, next: NextFunction) => {
        const id = request.params.id;
        try {
            const newData = await this.quizHelper.findQuestions(id)
            return response.status(200).send(newData)
        } catch (error) {
            console.log(error);
            return response.status(400).send(error)
        }
    }


    public routes(app: Application): void {
        app.route("/quiz").post(this.saveQuiz);
        app.route("/quiz/:id").get(this.findQuiz);
        app.route("/all-quiz").get(this.findAllQuiz);
        app.route("/question/:id").get(this.findQuestion);
        app.route("/quizbypk/:id").get(this.findQuizById);
    }
}