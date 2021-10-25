import { Request, Response } from "express";
import { Quiz } from "../models/quizModel";
import { quizzes } from "../type/quizzes";
import { Question } from "../models/questionModel";
import { questions } from "../type/questions";
import app from "../app";

export class quizHelper {
//Inserting Quizzes to datbase
  async createQuiz(quiz: any) {
    const newQuiz = await Quiz.create<Quiz>(quiz)
    return newQuiz;
  }

  //delete quiz by quizId
  async deleteQuiz(id: any) {
    await Quiz.destroy({
      where: {
        quiz_id: id
      }
    })

  }
  //Inserting Questions to database
  async createQuestion(question: questions[]) {
    const newQuestions = await Question.bulkCreate<Question>(question);
    return newQuestions;
  }
//displaying all questions to user
  async findAllQuestions(id: any) {
    const allQuiz = await Quiz.findAll({
      where: { quiz_category: id },
      include: [{
        model: Question,
      }]
    })
    return allQuiz;
  }
  //inserting All Quizes With questions into the database
  async createQuizWithQuestions(quiz: any) {
    const newQuiz = await Quiz.create({
      quiz_name: quiz.quizName,
      quiz_time: quiz.quizTime,
      quiz_category: quiz.quizCategory,
      questions: quiz.questions
    }, {
      include: Question
    })
    return newQuiz;
  }
  
  async findAllQuiz() {
    const allQuiz = await Quiz.findAll()
    return allQuiz;
  }
  async findQuiz(id: any) {
    const allQuiz = await Quiz.findAll({
      where: { quiz_category: id }
    })
    return allQuiz;
  }
  async findQuizByPK(id: any) {
    const allQuiz = await Quiz.findByPk(id)
    return allQuiz;
  }
  async findQuestions(id: any) {
    const allQuestion = await Question.findAll({
      where: { quiz_id: id }
    })
    return allQuestion;
  }
}
