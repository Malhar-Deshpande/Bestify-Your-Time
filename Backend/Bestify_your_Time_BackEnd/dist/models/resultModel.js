"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const quizModel_1 = require("./quizModel");
const usersModel_1 = require("./usersModel");
class Result extends sequelize_1.Model {
}
exports.Result = Result;
Result.init({
    result_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    obtained_marks: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    total_marks: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    quiz_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    tableName: "result",
    sequelize: database_1.database,
});
Result.belongsTo(usersModel_1.User, {
    foreignKey: "user_id",
    targetKey: "user_id",
});
Result.belongsTo(quizModel_1.Quiz, {
    foreignKey: "quiz_id",
    targetKey: "quiz_id",
});
Result.sync({ force: false }).then(() => console.log("Result table created"));
