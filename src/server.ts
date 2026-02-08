import express from 'express';

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

app.listen(port, () => {
    console.log(etudiants);
})