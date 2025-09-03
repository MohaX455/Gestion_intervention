import db from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// INSCRIPTION
export const register = (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }
    // Verification de l'existance de l'utilisateur
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (result.length > 0) return res.status(400).json({ message: "Email déjà utilisé" });

        if (role === "admin") {
            db.query("SELECT COUNT(*) AS count_admin FROM users WHERE role = 'admin'", async (err, result) => {
                if (err) return res.status(500).json({ message: err.message });
                if (result[0].count_admin > 0) {
                    return res.status(400).json({ message: "Un admin existe déjà" });
                }

                const hashedPassword = await bcrypt.hash(password, 10);
                db.query(
                    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
                    [name, email, hashedPassword, role],
                    (err, result) => {
                        if (err) return res.status(500).json({ message: err.message });
                        res.status(201).json({ message: `Utilisateur ${role} enregistré avec succès` });
                    }
                );
            });
        } else {
            // Pour technicien / secrétaire
            const hashedPassword = await bcrypt.hash(password, 10);
            db.query(
                "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
                [name, email, hashedPassword, role],
                (err, result) => {
                    if (err) return res.status(500).json({ message: err.message });
                    res.status(201).json({ message: `Utilisateur ${role} enregistré avec succès` });
                }
            );
        }
    });
};


// CONNEXION
export const login = (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: "Nom et mot de passe requis" });
    }

    db.query(
        "SELECT * FROM users WHERE username = ?",
        [name],
        async (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            if (result.length === 0) {
                return res.status(400).json({ message: "Utilsateur non trouvé" });
            }

            const user = result[0];

            // Vérification du mot de passe
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Mot de passe incorrect" });
            }

            // Générer un token JWT
            const token = jwt.sign(
                { id: user.id, name: user.username, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            // Stockage dans un cookie httpOnly
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // true en prod avec HTTPS
                sameSite: "strict",
                maxAge: 60 * 60 * 1000
            });

            res.status(200).json({ message: "Connexion réussie", token });
        }
    );
};
