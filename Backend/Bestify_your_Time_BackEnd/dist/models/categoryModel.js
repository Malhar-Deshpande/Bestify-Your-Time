"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Category extends sequelize_1.Model {
}
exports.Category = Category;
Category.init({
    cat_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    cat_name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
}, {
    tableName: "category",
    sequelize: database_1.database,
});
Category.sync({ force: false }).then(() => console.log("Category table created"));
