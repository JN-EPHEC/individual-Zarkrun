import express from "express";
import * as userController from "../controllers/userController.js";
import { checkIdParam } from "../middlewares/checkIdParam.js";

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Récupère la liste des utilisateurs
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Succès
 */

const router = express.Router();

router.get("/", userController.getAllUsers);
router.post("/", userController.postNewUsers);
router.delete("/:id", checkIdParam, userController.deleteUsers);

export default router; // ✅ correct pour TypeScript/ESM