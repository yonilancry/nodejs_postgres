# 📌 Projet Node.js avec Docker et PostgreSQL

Ce projet est une application Node.js utilisant Express, PostgreSQL et Docker. Il est configuré pour un rechargement automatique grâce à **Nodemon**.

---

## 🚀 Objectifs

- Démarrer une API Node.js avec Express et PostgreSQL
- Utiliser **Docker** et **Docker Compose** pour faciliter le déploiement
- Activer le **rechargement automatique** des modifications avec **Nodemon**
- Gérer une base de données PostgreSQL avec Sequelize

---

## 📂 Pré-requis

Assurez-vous d'avoir installé :

- **[Docker](https://www.docker.com/get-started)** & **Docker Compose**
- **Git**
- **Node.js (optionnel, pour exécuter localement sans Docker)**

---

## 🔽 1. Cloner le projet

Clonez ce dépôt en local :

```sh
git clone https://github.com/Daniween/nodejs_postgres.git
cd nodejs_postgres
```

---

Modifiez les variables d’environnement si nécessaire (ex: informations de connexion à la base de données).

---

## 🐳 2. Démarrer l'application avec Docker

Lancez les conteneurs avec Docker Compose :

```sh
docker-compose up --build
```

Cela va :

- Construire et démarrer l’API Node.js
- Démarrer une base de données PostgreSQL
- Activer **Nodemon** pour détecter automatiquement les modifications

**💡 Astuce :** Pour exécuter en arrière-plan, utilisez `docker-compose up -d`.

---

## 🔄 3. Vérifier si l'API fonctionne

Testez l'API avec `curl` ou Postman :

```sh
curl http://localhost:3050/api/
```

Vous devriez voir une réponse JSON.

---

## 🛠 4. Développement en temps réel avec Nodemon

L’application est configurée avec **Nodemon**, qui recharge automatiquement le serveur à chaque modification.

Si vous modifiez un fichier, vérifiez les logs Docker :

```sh
docker logs -f real-yoni-nodejs_app
```

Si les changements ne sont pas pris en compte :

```sh
docker-compose restart
```

---

## 📂 Structure du projet

```
nodejs-docker-app/
│── app/
│   ├── controllers/      # Logique métier
│   ├── models/           # Modèles Sequelize
│   ├── routes/           # Définition des routes API
│── init-db.sql           # Script d'initialisation de la base PostgreSQL
│── server.js             # Serveur Express principal
│── Dockerfile            # Configuration Docker
│── docker-compose.yml    # Configuration Docker Compose
│── package.json          # Dépendances Node.js
```

---

## 🔌 Arrêter les services

Pour arrêter l’application et supprimer les conteneurs :

```sh
docker-compose down
```

Si vous souhaitez aussi supprimer les volumes (⚠️ supprime la base de données) :

```sh
docker-compose down -v
```
