const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const projectRoutes = require('./app/routes/project.routes.js');

// Initialiser l'application Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurer Sequelize pour PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',  // Utiliser postgres
  logging: false,
});

// Synchroniser la base de données
sequelize.authenticate().then(() => {
  console.log('Connexion à la base de données réussie.');
}).catch(err => {
  console.error('Impossible de se connecter à la base de données:', err);
});

// Définir les routes
app.use('/api', projectRoutes);

// Démarrer le serveur
const PORT = process.env.PORT || 3050;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}.`);
});
