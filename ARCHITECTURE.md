# Architecture du projet

## 1. Structure du projet

Le projet est organisé afin de séparer les pages, les composants réutilisables, les services et les modèles.

```text
src/app/
├── components/
│   ├── header-component/
│   ├── medal-chart/
│   └── country-chart/
├── pages/
│   ├── dashboard-page/
│   ├── country-detail-page/
│   └── not-found/
├── services/
│   └── data.service.ts
└── models/
    └── olympic.model.ts
```

## 2. Pages

### DashboardPage

La page d'accueil affiche les statistiques générales des Jeux Olympiques ainsi que le graphique des médailles par pays.

Les pays sont triés par ordre alphabétique.

Un clic sur un pays dans le graphique permet d'accéder à sa page de détail grâce à son identifiant.

### CountryDetailPage

Cette page affiche les informations détaillées d'un pays :

- nombre de participations ;
- nombre total de médailles ;
- nombre total d'athlètes ;
- évolution des médailles selon les années.

La page vérifie que le pays demandé existe.

La page de détail peut être atteinte depuis le graphique avec l'identifiant du pays ou directement depuis l'URL avec son nom.

Un lien permet également de retourner à la page d'accueil.

### NotFoundComponent

Cette page est affichée lorsqu'aucune route ne correspond à l'URL demandée ou lorsqu'un pays demandé n'existe pas.

## 3. Composants réutilisables

### HeaderComponent

Affiche le titre d'une page ainsi qu'une liste de statistiques.

Il est réutilisé dans `DashboardPage` et `CountryDetailPage`.

### MedalChartComponent

Affiche le graphique des médailles par pays sur la page d'accueil.

Il permet également de naviguer vers la page de détail d'un pays lors d'un clic sur le graphique.

### CountryChartComponent

Affiche l'évolution du nombre de médailles d'un pays selon les années.

## 4. DataService

`DataService` centralise l'accès aux données de l'application.

Les pages n'utilisent pas directement `HttpClient`. Elles passent par le service pour récupérer les données.

Actuellement, les données proviennent du fichier JSON situé dans les assets.

## 5. Modèles

`OlympicModel` et `ParticipationModel` définissent la structure des données utilisées dans l'application.

Ils permettent d'avoir un typage TypeScript précis et d'éviter l'utilisation de `any`.

## 6. Navigation

La navigation vers la page de détail utilise une route dynamique.

Le clic sur un pays dans le graphique utilise son identifiant.

L'utilisateur peut également saisir directement le nom d'un pays dans l'URL.

Si le pays demandé n'existe pas, l'utilisateur est redirigé vers la page `NotFoundComponent`.

## 7. Future connexion à une API

Cette architecture prépare l'application à une future connexion avec un back-end.

L'accès aux données est centralisé dans `DataService` et n'est pas directement lié aux composants.

Il sera donc possible de modifier le service pour récupérer les données depuis une API sans devoir modifier l'ensemble des composants.
