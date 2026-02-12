# Configuration du projet

Ce guide explique comment configurer le projet pour le déploiement automatique via CI/CD.

## Prérequis

- Un compte Docker Hub
- Un serveur avec Docker et Docker Compose installés
- Un nom de domaine configuré (enregistrement DNS type A pointant vers l'IP du serveur)

## Secrets GitHub à configurer

Allez dans **Settings > Secrets and variables > Actions** de votre repository et ajoutez :

| Secret | Description | Exemple |
|--------|-------------|---------|
| `DOCKER_USERNAME` | Votre nom d'utilisateur Docker Hub |
| `DOCKER_PASSWORD` | Votre mot de passe Docker Hub |
| `SERVER_HOST` | Adresse IP du serveur |
| `SERVER_PORT` | Port SSH du serveur | `22` |
| `SERVER_USER` | Utilisateur SSH | `ubuntu` |
| `SSH_PRIVATE_KEY` | Clé SSH privée (contenu complet) | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `DOMAIN` | Votre nom de domaine | `monapp.example.com` |

## Configuration DNS

Ajoutez un enregistrement A chez votre registrar :

```
Type: A
Nom: votre-sous-domaine (ex: monapp)
Valeur: IP_DU_SERVEUR
```

## Déploiement

Une fois les secrets configurés, chaque `git push` sur la branche `main` :

1. Build l'image Docker
2. Push l'image sur Docker Hub
3. Copie les fichiers sur le serveur
4. Démarre Traefik (reverse proxy)
5. Déploie l'application

## Architecture

```
Internet
    │
    ▼
┌─────────────────┐
│    Traefik      │  ← Port 80 (HTTP)
│  (reverse proxy)│  ← Port 8080 (Dashboard)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Node.js App   │  ← Port 3050 (interne)
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   PostgreSQL    │  ← Port 5432 (interne)
└─────────────────┘
```

## Isolation multi-utilisateurs

Chaque utilisateur a ses propres containers nommés avec son `DOCKER_USERNAME` :
- `{username}-nodejs-app`
- `{username}-postgres-db`

Les volumes sont aussi isolés par projet grâce à `COMPOSE_PROJECT_NAME`.

## Commandes utiles (sur le serveur)

```bash
# Voir les containers en cours
docker ps

# Voir les logs de votre app
docker logs {username}-nodejs-app

# Redémarrer votre app
cd ~/app
export DOCKER_USERNAME=votre_username
export DOMAIN=votre.domaine.com
docker compose -p $DOCKER_USERNAME -f docker-compose.prod.yml restart

# Voir le dashboard Traefik
http://IP_SERVEUR:8080
```
