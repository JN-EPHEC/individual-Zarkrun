import type { Request, Response } from "express";
import User from "../models/Users.ts";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};

export const postNewUsers = async (req: Request, res: Response) => {
    try {
        const { id, firstName, lastName } = req.body;

        if (!id || !firstName || !lastName) {
            return res.status(400).json({ error: "Id, prénom et nom sont requis" });
        }

        const existingUser = await User.findByPk(id);

        if (existingUser) {
            await existingUser.update({ firstName, lastName });
            return res.json({ message: "Utilisateur mis à jour", data: existingUser });
        }

        const newUser = await User.create({
            id,
            firstName,
            lastName
        });

        res.status(201).json({ message: "Utilisateur créé", data: newUser });

    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteUsers = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur inexistant" });
        }

        await user.destroy();

        return res.status(200).json({ message: "Utilisateur supprimé" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur" });
    }
};

