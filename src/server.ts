import express from 'express';
import userRoutes from "./routes/userRoutes.ts";
import sequelize from "./config/database.ts";
import User from './models/Users.ts'

try {
    await sequelize.sync({ force: true });
    console.log('All models were synchronized successfully.');
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

const app = express();
const port = 3000;

const etudiants = [
    { id: 1, nom: "Dupont", prenom: "Jean" },
    { id: 2, nom: "Martin", prenom: "Sophie" },
    { id: 3, nom: "Doe", prenom: "John" },
];

app.get('/api/data', (request, response) => {
    response.json(etudiants);
});

app.get('/api/hello/:name', (request, response) => {
    const name = request.params.name
    response.json({ "message": `Bonjour ${name}`, "timestamp": new Date().toISOString() });
});

app.use('/api/users', userRoutes);


app.listen(port, () => {
    console.log('http://localhost:3000');
    });





