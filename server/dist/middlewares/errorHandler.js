import { logger } from "./logger";
export const errorHandler = (err, req, res, next) => {
    logger.error({
        message: err.message,
        status: err.status || 500,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
    });
    const status = err.status || 500;
    res.status(status).json({
        status,
        message: err.message || "Internal Server Error",
    });
};
//# sourceMappingURL=errorHandler.js.map