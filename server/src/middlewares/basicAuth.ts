import type { Request, Response, NextFunction } from "express";

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ message: "Authorization header manquant" });
    }

    try {
        const base64String = authHeader.split(" ")[1];

        const credentials = Buffer.from(base64String, "base64").toString("utf-8");

        const [username, password] = credentials.split(":");

        if (username === "admin" && password === "supersecret") {
            return next();
        }

        return res.status(401).json({ message: "Identifiants invalides" });
    } catch (error) {
        return res.status(400).json({ message: "Erreur lors du décodage" });
    }
};