import { Sequelize } from "sequelize";
import type { Options } from "sequelize";

class Database {
    private static instance: Sequelize;

    private constructor() {}

    public static getInstance(): Sequelize {
        if (!Database.instance) {
            Database.instance = process.env.DATABASE_URL
                ? new Sequelize(process.env.DATABASE_URL, {
                    dialect: "postgres",
                    dialectOptions: {
                        ssl: { require: true, rejectUnauthorized: false },
                    },
                    logging: false,
                })
                : new Sequelize({
                    username: process.env.DB_USER || "postgres",
                    password: process.env.DB_PASSWORD || "postgres",
                    database: process.env.DB_NAME || "postgres",
                    host: process.env.DB_HOST || "localhost",
                    port: Number(process.env.DB_PORT || 6543),
                    dialect: "postgres",
                    dialectOptions: {
                        ssl: { require: true, rejectUnauthorized: false },
                    },
                    logging: false,
                } as Options);
        }

        return Database.instance;
    }
}

export default Database;