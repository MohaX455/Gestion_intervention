import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token; // récupère le token depuis le cookie

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // stocker les infos dans req.user
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

// Vérifie si l'utilisateur a le bon rôle
export const verifyRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied: insufficient role" });
        }
        next();
    };
};

