import express from 'express';
import userRoutes from "./routes/userRoutes.ts"

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
    //console.log(etudiants);
})