"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategory = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const categoryModel_1 = require("./categoryModel");
class SubCategory extends sequelize_1.Model {
}
exports.SubCategory = SubCategory;
SubCategory.init({
    sub_cat_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    sub_cat_name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    cat_id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
}, {
    tableName: "sub_category",
    sequelize: database_1.database,
});
SubCategory.belongsTo(categoryModel_1.Category, { foreignKey: 'cat_id', targetKey: 'cat_id' });
SubCategory.sync({ force: false }).then(() => console.log("SubCategory table created"));
