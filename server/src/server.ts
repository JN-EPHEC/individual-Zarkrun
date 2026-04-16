import express from "express";
import userRoutes from "./routes/userRoutes.js";
import Database from "./config/database.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import cors from "cors";

const app = express();
const port = Number(process.env.PORT || 3000);
const sequelize = Database.getInstance();

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.use(cors());
    app.use(express.static("public"));
    app.use(express.json());
    app.use("/api/users", userRoutes);
    app.get("/test-error", (req, res, next) => {
        const error = new Error("Erreur de test");
        (error as any).status = 400;
        next(error);
    });
    app.use(errorHandler);

    app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
})();
