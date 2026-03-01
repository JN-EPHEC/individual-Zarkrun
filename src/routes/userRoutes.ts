import express from 'express';
import * as userController from "../controllers/userController";
import { checkIdParam } from "../middlewares/checkIdParam";


const router = express.Router();

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
router.get("/", userController.getAllUsers);

router.post("/", userController.postNewUsers);

router.delete("/:id", checkIdParam, userController.deleteUsers);

module.exports = router;