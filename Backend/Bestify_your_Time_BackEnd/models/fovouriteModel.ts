import { Sequelize, Model, BuildOptions, DataTypes } from "sequelize";
import { database } from "../config/database";
import { Quiz } from "./quizModel";
import { User } from "./usersModel";

export class Favourite extends Model {

    public fav_id!: number;
    public quiz_id!: number;
    public user_id!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Favourite.init(
    {
        fav_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        quiz_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false, onDelete: 'CASCADE',
            onUpdate: 'CASCADE',

        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    },
    {
        tableName: "favourite",
        sequelize: database,
    }

)

Favourite.belongsTo(User, {
    foreignKey: "user_id",
    targetKey: "user_id",
});

Favourite.belongsTo(Quiz, {
    foreignKey: "quiz_id",
    targetKey: "quiz_id",
});
Favourite.sync({ force: false }).then(() => console.log("favourite table created"));
