import { Sequelize, Model, BuildOptions, DataTypes } from "sequelize";
import { database } from "../config/database";
import { Category } from "./categoryModel";

export class SubCategory extends Model {
  public sub_cat_id!: number;
  public sub_cat_name!: string;
  public cat_id!: Number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SubCategory.init(
  {
    sub_cat_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    sub_cat_name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    cat_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',

    },
  },
  {
    tableName: "sub_category",
    sequelize: database,
  }
);
SubCategory.belongsTo(Category, { foreignKey: 'cat_id', targetKey: 'cat_id' });
SubCategory.sync({ force: false }).then(() => console.log("SubCategory table created"));