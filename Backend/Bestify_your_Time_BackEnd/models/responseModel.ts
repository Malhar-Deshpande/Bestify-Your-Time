import { Sequelize, Model, BuildOptions, DataTypes } from "sequelize";;
import { database } from "../config/database";
import { Quiz } from "./quizModel";
import { User } from "./usersModel";

export class ResponseData extends Model {
  public res_id!: Number;
  public question_id!: Number;
  public remaining_time!: Number;
  public selected_ans!: String;
  public status!: String;
  public user_id!: Number;
  public quiz_id!: Number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ResponseData.init(
  {
    res_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    question_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    remaining_time: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    selected_ans: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    status: {
      type: new DataTypes.STRING(128),
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
  },
  {
    tableName: "response",
    sequelize: database,
  }
);

ResponseData.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "user_id",
});

ResponseData.belongsTo(Quiz, {
  foreignKey: "quiz_id",
  targetKey: "quiz_id",
});
ResponseData.sync({ force: false }).then(() =>
  console.log("Response table created")
);
