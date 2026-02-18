import express from 'express';
import User from "../models/Users.ts";


const router = express.Router();


router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
});


router.post('/', async (req, res) => {
    try {
        const { firstName, lastName } = req.body; // récupère les données envoyées

        // Validation simple
        if (!firstName || !lastName) {
            return res.status(400).json({ error: "Prénom et nom sont requis" });
        }

        const newUser = await User.create({
            firstName,
            lastName
        });

        console.log("Created:", newUser.toJSON());
        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur inexistant" });
        }
        await user.destroy();

        res.json({ message: "Utilisateur supprimé" });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;