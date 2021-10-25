"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Question = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const quizModel_1 = require("./quizModel");
class Question extends sequelize_1.Model {
}
exports.Question = Question;
Question.init({
    question_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    question: {
        type: new sequelize_1.DataTypes.STRING(1000),
        allowNull: false,
    },
    choice1: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: true,
    },
    choice2: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: true,
    },
    choice3: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: true,
    },
    choice4: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: true,
    },
    answer: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    quiz_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: "questions",
    sequelize: database_1.database,
});
Question.belongsTo(quizModel_1.Quiz, {
    foreignKey: "quiz_id",
    targetKey: "quiz_id",
});
quizModel_1.Quiz.hasMany(Question, { foreignKey: 'quiz_id' });
Question.sync({ force: false }).then(() => console.log("Question table created"));
