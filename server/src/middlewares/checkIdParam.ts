import type { Request, Response, NextFunction } from "express";

export const checkIdParam = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    const parsedId = Number(id);

    if (!id || isNaN(parsedId) || !Number.isInteger(parsedId)) {
        return res.status(400).json({
            status: 400,
            message: "L'id doit être un entier valide",
        });
    }

    next();
};