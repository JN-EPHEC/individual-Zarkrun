import type { Request, Response, NextFunction} from "express";
import User from "../models/Users.ts";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
};

export const postNewUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, firstName, lastName } = req.body;

        if (!id || !firstName || !lastName) {
            const error = new Error("Id, prénom et nom sont requis");
            (error as any).status = 400;
            return next(error);
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
        next(error)
    }
};

export const deleteUsers = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);

        if (!user) {
            const error = new Error("Utilisateur inexistant");
            (error as any).status = 404;
            return next(error);
        }

        await user.destroy();

        return res.status(200).json({ message: "Utilisateur supprimé" });

    } catch (error) {
       next(error)
    }
};

