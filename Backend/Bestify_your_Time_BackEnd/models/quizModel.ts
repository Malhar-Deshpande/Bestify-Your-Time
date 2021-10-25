import { Sequelize, Model, BuildOptions, DataTypes } from "sequelize";
import { database } from "../config/database";
import { SubCategory } from "./subCategoryModel";

export class Quiz extends Model {
  public quiz_id!: number;
  public quiz_name!: string;
  public quiz_time!: string;
  public quiz_category!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Quiz.init(
  {
    quiz_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    quiz_name: {
      type: new DataTypes.STRING(1000),
      allowNull: false,
      unique: true,
    },
    quiz_time: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    quiz_category: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    tableName: "quizzes",
    sequelize: database,
  }
);

Quiz.belongsTo(SubCategory, { foreignKey: 'quiz_category', targetKey: 'sub_cat_id' });
Quiz.sync({ force: false }).then(() => console.log("Quiz table created"));
