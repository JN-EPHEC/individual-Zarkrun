import express from 'express';

const app = express();
const port = 3000;

app.get('/', (request, response) => {
    response.send('Bienvenue sur mon serveur API');
});

app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port} `);
})