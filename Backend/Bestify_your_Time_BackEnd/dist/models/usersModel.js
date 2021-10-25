"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const sequelize_2 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_2.Model {
}
exports.User = User;
User.init({
    user_id: {
        type: sequelize_2.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    }, name: {
        type: new sequelize_2.DataTypes.STRING(128),
        allowNull: false,
    }, username: {
        type: new sequelize_2.DataTypes.STRING(128),
        allowNull: false,
    }, email: {
        type: new sequelize_2.DataTypes.STRING(128),
        allowNull: false,
    }, password: {
        type: new sequelize_2.DataTypes.STRING(128),
        allowNull: false,
    }, role: {
        type: new sequelize_1.default.DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user',
    }
}, {
    tableName: "users",
    sequelize: database_1.database,
});
User.sync({ force: false }).then(() => console.log("Node table created"));
