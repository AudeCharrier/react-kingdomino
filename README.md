# 👑 Kingdomino

Application web inspirée de Kingdomino Origins, permettant de jouer en solo avec une interface interactive et une gestion dynamique des parties.

👉 Démo : [Netlify - React-Kingdomino](https://react-kingdomino.netlify.app) -> regarder le tutoriel puis cliquer sur Prochain Tour<br>
👉 Front : [GitHub - Kingdomino](https://github.com/audecharrier/react-kingdomino) <br>
👉 API : [GitHub - API Kingdomino](https://github.com/audecharrier/api-kingdomino)

<br>

## Contexte

Projet réalisé seule dans le cadre de mon apprentissage du développement web avec React.

Objectif : concevoir une application plus complexe qu’un site vitrine, intégrant logique de jeu, interactions avancées et gestion d’état dynamique.

Adaptation du jeu Kingdomino Origins avec une API dédiée pour la gestion des tuiles.

<br>

## Fonctionnalités

- Interface de jeu complète et immersive (plateau interactif)
- Tirage aléatoire des dominos en temps réel
- Drag & drop des tuiles sur une grille dynamique
- Application des règles du jeu Kingdomino
- Calcul automatique des scores
- Overlays tutoriel et score de fin de partie

<br>

## Stack technique

![Mes technos](https://skillicons.dev/icons?i=react,ts,js,nodejs,express,html,css,git,github)

<br>


## Développement en autonomie

### Logique de jeu

- Création et consommation d’une API personnalisée
- Gestion d’un système de jeu complet en React
- Implémentation d’un système de tirage aléatoire sans remise
- Implémentation du drag & drop sur grille dynamique
- Gestion d’état et d'évènements complexe (React)
- Algorithme de scoring basé sur des règles métier
- Conception d’une architecture full-stack (front + API)

<br>

### Interface et expérience utilisateur

- Création complète de l’interface et du plateau de jeu
- Travail sur l’immersion, la lisibilité et la fluidité des interactions (drag & drop)
- Intégration d’un tutoriel vidéo directement dans l’application

<br>

## Difficultés rencontrées

- Gestion spatiale différente d'un site web
- Mise en place du drag & drop sur un plateau dynamique
- Mise en place du snap des tuiles sur les cellules de la grille
- Construction de l’algorithme de calcul des scores
- Gestion des nombreux états liés à la partie

<br>

## Améliorations possibles

- Sécurisation du gameplay (validations, misclicks, recouvrement)
- Ajout de mécaniques avancées (volcans, règles supplémentaires)
- Amélioration UX (responsive, tutoriel, tours restants)
- Polish visuel et sonore
- Fonctionnalités avancées (multijoueur, comptes, stats)

<br>

## Gestion du projet

Projet réalisé entièrement seule.

Ce projet m’a permis de développer mon autonomie sur :
- l’architecture d’une application React
- la gestion d’interactions complexes
- la communication entre le front et l’API
- la réflexion sur l'expérience utilisateur
- la conception et la réalisation d’un projet de A à Z
- l’organisation d’un workflow Git

<br>

## 📂 Installation

### Backend (API)

```bash
git clone https://github.com/audecharrier/api-kingdomino
cd api-kingdomino
npm install
```

### Configuration du backend

Créer un fichier .env à partir de .env.sample.<br>

PORT=3001<br>
FRONT_URL=http://localhost:5173<br>

### Lancement du backend

```bash
node index.js
```

### Frontend

```bash
git clone https://github.com/audecharrier/react-kingdomino
cd react-kingdomino
npm install
```

### Configuration du frontend

Créer un fichier .env à partir de .env.sample.<br>

VITE_API_URL=http://localhost:3001

### Lancement du frontend

```bash
npm run dev
```



