import { Sequelize, Model, BuildOptions, DataTypes } from "sequelize";
import { database } from "../config/database";
import { User } from "./usersModel";

export class Game extends Model {
  public game_id!: number;
  public game_name!: string;
  public score!: number;
  public user_id!: Number;
  public createdAt!: Date;
  public readonly updatedAt!: Date;
}

Game.init(
  {
    game_result_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    game_name: {
      type: new DataTypes.STRING(128),
      allowNull: false,

    },
    score: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
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
    tableName: "game",
    sequelize: database,
  }
);

Game.belongsTo(User, {
  foreignKey: "user_id",
  targetKey: "user_id",
})

Game.sync({ force: false }).then(() => console.log("game table created"));