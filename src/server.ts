import express from 'express';
import userRoutes from "./routes/userRoutes.ts";
import sequelize from "./config/database.ts";
import User from './models/Users.ts'

/*
On se connecte a la db puis on recrer toute la table de zéros
 */
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// const pour la redondance
const app = express();
const port = 3000;

/* */
app.use(express.static('public'))
app.use(express.json());
app.use('/api/users', userRoutes);


app.listen(port, () => {
    console.log('http://localhost:3000');
    });








