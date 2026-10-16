# Olympic Games

Ce projet a été généré avec Angular CLI version 18.0.6.

L'application permet de consulter les médailles obtenues par différents pays aux Jeux Olympiques et d'accéder au détail de leurs participations.

## Installation

Installer les dépendances :

```bash
npm install
```

## Serveur de développement

Lancer :

```bash
ng serve
```

Puis accéder à l'application sur `http://localhost:4200/`.

L'application se recharge automatiquement lorsque les fichiers sources sont modifiés.

## Build

Lancer :

```bash
ng build
```

Les fichiers générés sont disponibles dans le dossier `dist/`.

## Architecture

Le projet est organisé de manière à séparer les différentes responsabilités :

- `components/` : contient les composants réutilisables.
- `pages/` : contient les pages utilisées par le système de routing.
- `services/` : contient la logique d'accès aux données.
- `models/` : contient les interfaces TypeScript représentant les données.

Une description plus détaillée est disponible dans `ARCHITECTURE.md`.

## Choix techniques

L'accès aux données est centralisé dans `DataService`.

Les données sont typées avec des interfaces TypeScript afin d'éviter l'utilisation de `any`.

Les graphiques sont gérés avec Chart.js et séparés dans des composants réutilisables.

Les pays sont triés par ordre alphabétique afin de conserver un affichage cohérent entre les différentes pages.
