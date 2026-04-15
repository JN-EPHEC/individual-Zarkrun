import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class User extends Model {}

User.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
    },
    {
        sequelize,
        modelName: "User",
        timestamps: true,
    }
);

export default User;