"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseData = void 0;
const sequelize_1 = require("sequelize");
;
const database_1 = require("../config/database");
const quizModel_1 = require("./quizModel");
const usersModel_1 = require("./usersModel");
class ResponseData extends sequelize_1.Model {
}
exports.ResponseData = ResponseData;
ResponseData.init({
    res_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    question_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    remaining_time: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    selected_ans: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    status: {
        type: new sequelize_1.DataTypes.STRING(128),
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
}, {
    tableName: "response",
    sequelize: database_1.database,
});
ResponseData.belongsTo(usersModel_1.User, {
    foreignKey: "user_id",
    targetKey: "user_id",
});
ResponseData.belongsTo(quizModel_1.Quiz, {
    foreignKey: "quiz_id",
    targetKey: "quiz_id",
});
ResponseData.sync({ force: false }).then(() => console.log("Response table created"));
