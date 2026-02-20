import express from 'express';
import userRoutes from "./routes/userRoutes.ts";
import sequelize from "./config/database.ts";
import requestLogger from "./middlewares/logger.ts"

/*
On se connecte a la db puis on recrer toute la table de zéros
 */
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// const pour la redondance
const app = express();
const port = 3000;

/* */
app.use(requestLogger);
app.use(express.static('public'))
app.use(express.json());
app.use('/api/users', userRoutes);


app.listen(port, () => {
    console.log('http://localhost:3000');
    });








