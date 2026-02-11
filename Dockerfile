# Utiliser une image Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json AVANT pour optimiser le cache
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier TOUT le code APRÈS l'installation (évite de refaire npm install à chaque build)
COPY . .

# Installer nodemon globalement
RUN npm install -g nodemon

# Exposer le port de l'application
EXPOSE 3050

# Commande de démarrage avec Nodemon
CMD ["npm", "run", "dev"]
