import express from "express";
import * as userController from "../controllers/userController.js";
import { checkIdParam } from "../middlewares/checkIdParam.js";
import { basicAuth } from "../middlewares/basicAuth.js";
import { jwtAuth } from "../middlewares/jwtAuth.js";

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

/**
 * @swagger
 * /api/users/admin/basic:
 *   get:
 *     summary: Route protégée Basic Auth
 *     tags: [Admin]
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Succès
 *       401:
 *         description: Non autorisé
 */
router.get("/admin/basic", basicAuth, (req, res) => {
    res.json({ message: "Accès autorisé (Basic Auth)" });
});

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Profil utilisateur (JWT requis)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Succès
 *       401:
 *         description: Token manquant ou expiré
 *       403:
 *         description: Token invalide
 */
router.get("/profile", jwtAuth, (req: any, res) => {
    res.json({
        message: "Profil utilisateur",
        user: req.user,
    });
});
export default router;