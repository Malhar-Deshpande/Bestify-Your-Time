"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const subCategoryModel_1 = require("./subCategoryModel");
class Quiz extends sequelize_1.Model {
}
exports.Quiz = Quiz;
Quiz.init({
    quiz_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    quiz_name: {
        type: new sequelize_1.DataTypes.STRING(1000),
        allowNull: false,
        unique: true,
    },
    quiz_time: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    quiz_category: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: "quizzes",
    sequelize: database_1.database,
});
Quiz.belongsTo(subCategoryModel_1.SubCategory, { foreignKey: 'quiz_category', targetKey: 'sub_cat_id' });
Quiz.sync({ force: false }).then(() => console.log("Quiz table created"));
