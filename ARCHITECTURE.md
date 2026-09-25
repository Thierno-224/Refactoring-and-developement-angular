# Architecture du projet

## 1. Structure du projet

Le projet est organisé afin de séparer les pages, les composants réutilisables, les services et les modèles.
```
src/app/
├── components/
│   ├── stat-card/
│   ├── medal-chart/
│   └── country-chart/
├── pages/
│   ├── home/
│   ├── country/
│   └── not-found/
├── services/
│   └── data.service.ts
└── models/
└── olympic.model.ts
```
## 2. Pages

### HomeComponent

La page d'accueil affiche les statistiques générales des Jeux Olympiques ainsi que le graphique des médailles par pays.

### CountryComponent

La page Country affiche les informations détaillées d'un pays : nombre de participations, médailles, athlètes et évolution des médailles.

### NotFoundComponent

Cette page est affichée lorsqu'aucune route ne correspond à l'URL demandée.

## 3. Composants réutilisables

### StatCardComponent

Affiche une statistique composée d'un titre et d'une valeur.

Il est réutilisé dans HomeComponent et CountryComponent.

### MedalChartComponent

Affiche le graphique des médailles par pays sur la page d'accueil.

### CountryChartComponent

Affiche l'évolution du nombre de médailles d'un pays selon les années.

## 4. DataService

DataService centralise l'accès aux données de l'application.

Les pages n'utilisent plus directement HttpClient. Elles passent par DataService pour récupérer les données.

Actuellement, les données proviennent du fichier JSON situé dans les assets.

## 5. Modèles

OlympicModel et ParticipationModel définissent la structure des données utilisées dans l'application.

Ils permettent d'avoir un typage TypeScript précis et d'éviter l'utilisation de `any`.

## 6. Future connexion à une API

Cette architecture prépare l'application à une future connexion avec un back-end.

Les composants dépendent de DataService et non directement du fichier JSON.

Il sera donc possible de modifier DataService pour récupérer les données depuis une API sans devoir modifier tous les composants.
