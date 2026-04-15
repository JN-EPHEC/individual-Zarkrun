export const checkIdParam = (req, res, next) => {
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
//# sourceMappingURL=checkIdParam.js.map