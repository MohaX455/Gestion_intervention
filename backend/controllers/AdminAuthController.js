import db from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// INSCRIPTION
export const registerAdmin = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Vérifier si l'admin existe déjà
    db.query(
        "SELECT * FROM Responsable WHERE admin_email = ?",
        [email],
        async (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            if (result.length > 0) {
                return res.status(400).json({ message: "Email déjà utilisé" });
            }

            // Hasher le mot de passe
            const hashedPassword = await bcrypt.hash(password, 10);

            // Ajout de l’admin à la base
            db.query(
                "INSERT INTO Responsable (admin_name, admin_email, admin_password) VALUES (?, ?, ?)",
                [name, email, hashedPassword],
                (err, result) => {
                    if (err) return res.status(500).json({ message: err.message });
                    res.status(201).json({ message: "Admin enregistré" });
                }
            );
        }
    );
};



// CONNEXION
export const loginAdmin = (req, res) => {
    const { name, password } = req.body;

    if (!name || !password) {
        return res.status(400).json({ message: "Nom et mot de passe requis" });
    }

    db.query(
        "SELECT * FROM Responsable WHERE admin_name = ?",
        [name],
        async (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            if (result.length === 0) {
                return res.status(400).json({ message: "Admin non trouvé" });
            }

            const admin = result[0];

            // Vérification du mot de passe
            const isMatch = await bcrypt.compare(password, admin.admin_password);
            if (!isMatch) {
                return res.status(400).json({ message: "Mot de passe incorrect" });
            }

            // Générer un token JWT
            const token = jwt.sign(
                { id: admin.id, name: admin.admin_name },
                process.env.JWT_SECRET,
                { expiresIn: "2h" }
            );

            // Stockage dans un cookie httpOnly
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // true en prod avec HTTPS
                sameSite: "strict",
                maxAge: 60 * 60 * 2000
            });

            res.status(200).json({ message: "Connexion réussie", token });
        }
    );
};
