import sequelize from "sequelize";
import { Sequelize, Model, BuildOptions, DataTypes } from "sequelize";
import { defaultValueSchemable } from "sequelize/types/lib/utils";
import { database } from "../config/database";

export class User extends Model {

  public user_id!: number;
  public name!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: string
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    }, name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    }, username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    }, email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    }, password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    }, role: {
      type: new sequelize.DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user',
    }
  },
  {
    tableName: "users",
    sequelize: database,
  }

)
User.sync({ force: false }).then(() => console.log("Node table created"));
