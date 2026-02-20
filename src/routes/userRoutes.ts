import express from 'express';
import * as userController from "../controllers/userController";

const router = express.Router();

router.get("/", userController.getAllUsers);

router.post("/", userController.postNewUsers);

router.delete("/:id", userController.deleteUsers);
module.exports = router;