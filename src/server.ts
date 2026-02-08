import express from 'express';

const app = express();
const port = 3000;µ

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
app.listen(port, () => {
    //console.log(etudiants);
})