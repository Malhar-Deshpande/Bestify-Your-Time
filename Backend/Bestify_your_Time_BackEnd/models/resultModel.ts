import { Sequelize, Model, BuildOptions, DataTypes } from "sequelize";

import { database } from "../config/database";
import { Quiz } from "./quizModel";
import { User } from "./usersModel";

export class Result extends Model {
  public result_id!: number;
  public obtained_marks!: number;
  public total_marks!: number;
  public user_id!: number;
  public quiz_id!: number;
  public createdAt!: Date;
  public readonly updatedAt!: Date;
}

Result.init(
  {
    result_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    obtained_marks: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    total_marks: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quiz_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    createdAt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "result",
    sequelize: database,
  }
);

Result.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "user_id",
});

Result.belongsTo(Quiz, {
  foreignKey: "quiz_id",
  targetKey: "quiz_id",
});
Result.sync({ force: false }).then(() => console.log("Result table created"));
