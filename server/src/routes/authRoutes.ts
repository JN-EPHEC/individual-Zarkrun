import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

const demoUser = {
    id: 1,
    username: "student",
    password: "password123",
    role: "admin",
};

const createAccessToken = () => {
    return jwt.sign(
        {
            id: demoUser.id,
            username: demoUser.username,
            role: demoUser.role,
        },
        process.env.JWT_ACCESS_SECRET as string,
        { expiresIn: "15m" }
    );
};

const createRefreshToken = () => {
    return jwt.sign(
        {
            id: demoUser.id,
            username: demoUser.username,
        },
        process.env.JWT_REFRESH_SECRET as string,
        { expiresIn: "7d" }
    );
};


router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (
        username !== demoUser.username ||
        password !== demoUser.password
    ) {
        return res.status(401).json({ message: "Identifiants invalides" });
    }

    const accessToken = createAccessToken();
    const refreshToken = createRefreshToken();

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
});

router.post("/refresh", (req, res) => {
    try {
        console.log("cookies:", req.cookies); // ✅ ICI

        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token manquant" });
        }

        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET as string
        ) as any;

        const newAccessToken = jwt.sign(
            {
                id: decoded.id,
                username: decoded.username,
                role: demoUser.role,
            },
            process.env.JWT_ACCESS_SECRET as string,
            { expiresIn: "15m" }
        );

        return res.json({ accessToken: newAccessToken });
    } catch (err) {
        return res.status(403).json({
            message: "Refresh token invalide ou expiré",
        });
    }
});

export default router;