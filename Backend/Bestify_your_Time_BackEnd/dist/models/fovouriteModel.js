"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Favourite = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const quizModel_1 = require("./quizModel");
const usersModel_1 = require("./usersModel");
class Favourite extends sequelize_1.Model {
}
exports.Favourite = Favourite;
Favourite.init({
    fav_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    quiz_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false, onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }
}, {
    tableName: "favourite",
    sequelize: database_1.database,
});
Favourite.belongsTo(usersModel_1.User, {
    foreignKey: "user_id",
    targetKey: "user_id",
});
Favourite.belongsTo(quizModel_1.Quiz, {
    foreignKey: "quiz_id",
    targetKey: "quiz_id",
});
Favourite.sync({ force: false }).then(() => console.log("favourite table created"));
