import { Sequelize, Model, BuildOptions, DataTypes } from "sequelize";
import { database } from "../config/database";

export class Category extends Model {
  public cat_id!: number;
  public cat_name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Category.init(
  {
    cat_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    cat_name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true
    },
  },
  {
    tableName: "category",
    sequelize: database,
  }
);

Category.sync({ force: false }).then(() => console.log("Category table created"));