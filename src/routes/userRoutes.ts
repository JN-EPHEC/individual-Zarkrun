import express from 'express';
import User from "../models/Users.ts";


const router = express.Router();


router.get('/', async (req, res) => {
    const users = await User.findAll()
    res.json(users)
});

router.post('/', async (req, res) => {
    try {
        const { id, firstName, lastName } = req.body;

        if (!id || !firstName || !lastName) {
            return res.status(400).json({ error: "Id, prénom et nom sont requis" });
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