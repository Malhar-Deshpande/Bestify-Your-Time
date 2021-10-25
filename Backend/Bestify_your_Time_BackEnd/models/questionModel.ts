import { Sequelize, Model, BuildOptions, DataTypes } from "sequelize";
import { database } from "../config/database";
import { Quiz } from "./quizModel";
export class Question extends Model {
  public question_id!: number;
  public question!: string;
  public choice1!: string;
  public choice2!: string;
  public choice3!: string;
  public choice4!: string;
  public answer!: string;
  public quiz_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Question.init(
  {
    question_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    question: {
      type: new DataTypes.STRING(1000),
      allowNull: false,
    },
    choice1: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    choice2: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    choice3: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    choice4: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    answer: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    quiz_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  },
  {
    tableName: "questions",
    sequelize: database,
  }
);
Question.belongsTo(Quiz, {
  foreignKey: "quiz_id",
  targetKey: "quiz_id",
});
Quiz.hasMany(Question, { foreignKey: 'quiz_id' })

Question.sync({ force: false }).then(() => console.log("Question table created"));
