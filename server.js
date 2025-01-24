require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/database');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Logger des requêtes

// Connexion à la base de données
connectDB();

// Route d'accueil
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API de gestion des catways.');
});

// Routes
app.use('/catways', require('./src/routes/catwayRoutes'));
app.use('/auth', require('./src/routes/authRoutes'));

// Gestion des erreurs globales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Une erreur interne est survenue.' });
});

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
