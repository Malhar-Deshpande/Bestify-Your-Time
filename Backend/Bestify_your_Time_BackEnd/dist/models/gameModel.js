"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const usersModel_1 = require("./usersModel");
class Game extends sequelize_1.Model {
}
exports.Game = Game;
Game.init({
    game_result_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    game_name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    score: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
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
    tableName: "game",
    sequelize: database_1.database,
});
Game.belongsTo(usersModel_1.User, {
    foreignKey: "user_id",
    targetKey: "user_id",
});
Game.sync({ force: false }).then(() => console.log("game table created"));
