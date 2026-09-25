# Étape 1 : Analyser le code existant et repérer les problèmes 

## Objectif

J'ai parcouru le projet existant afin d'identifier les éléments
qui pourraient rendre le code difficile à comprendre ou à maintenir.

J'ai principalement regardé les composants présents dans `src/app`,
les appels HTTP, le typage TypeScript, la gestion des données
et les observables.

---

## 1. HomeComponent

### Appel HTTP directement dans le composant

Le composant `HomeComponent` utilise directement `HttpClient`
pour récupérer les données depuis le fichier `olympic.json`.

**Commentaire :**

Le composant s'occupe lui-même de récupérer les données alors que
cette responsabilité pourrait être séparée du composant.

---

### Utilisation de `any`

Plusieurs `any` sont présents dans le composant :

- dans la requête HTTP ;
- dans les `map()` ;
- dans les `reduce()`.

**Commentaire :**

L'utilisation de `any` empêche TypeScript de vérifier correctement
le type des données.

Cela peut rendre certaines erreurs plus difficiles à détecter.

---

### Plusieurs responsabilités dans le composant

`HomeComponent` :

- récupère les données ;
- calcule le nombre de pays ;
- calcule le nombre de Jeux olympiques ;
- calcule le nombre de médailles ;
- crée le graphique ;
- gère le clic sur le graphique ;
- effectue la navigation vers un pays.

**Commentaire :**

Le composant fait beaucoup de choses différentes.

Cela rend le fichier plus difficile à lire et à comprendre.

---

### Calculs directement dans le composant

Plusieurs calculs sont réalisés directement dans `ngOnInit()`
avec `map()`, `flat()`, `Set()` et `reduce()`.

**Commentaire :**

Il y a beaucoup de logique directement dans `ngOnInit()`.

Certaines lignes sont longues et difficiles à comprendre rapidement.

---

### Utilisation de `console.log`

Le composant contient des `console.log()` pour afficher les données
et les erreurs.

**Commentaire :**

Ces lignes semblent surtout servir au débogage.

Elles ne sont pas nécessaires au fonctionnement final
de l'application.

---

### `pipe()` vide

La requête HTTP contient :

`pipe().subscribe(...)`

**Commentaire :**

Le `pipe()` est vide et aucun opérateur RxJS n'est utilisé dedans.

Il ne sert donc à rien dans son état actuel.

---

### Gestion des erreurs

Une erreur HTTP est enregistrée dans la propriété `error`.

Cependant, cette erreur n'est pas affichée dans le template HTML.

**Commentaire :**

Une erreur peut être enregistrée dans le composant sans que
l'utilisateur sache qu'un problème s'est produit.

---

### Création du graphique dans le composant

Le graphique Chart.js est directement créé dans `HomeComponent`.

**Commentaire :**

La gestion du graphique ajoute encore une responsabilité
au composant.

---

## 2. CountryComponent

### Appel HTTP directement dans le composant

Comme `HomeComponent`, `CountryComponent` utilise directement
`HttpClient` pour récupérer `olympic.json`.

**Commentaire :**

Le même fichier de données est chargé directement dans plusieurs
composants.

Il y a donc une répétition dans la manière de récupérer les données.

---

### Utilisation importante de `any`

Le composant contient plusieurs `any`, par exemple dans :

- `totalEntries` ;
- la requête HTTP ;
- `find()` ;
- `map()` ;
- `reduce()`.

**Commentaire :**

Il est difficile de connaître précisément la structure des objets
manipulés.

Le typage TypeScript n'est donc pas vraiment utilisé.

---

### Gestion du paramètre de route

Le composant récupère le nom du pays avec :

`this.route.paramMap.subscribe(...)`

Il effectue ensuite séparément une deuxième souscription
pour récupérer les données.

**Commentaire :**

Il y a plusieurs `subscribe()` dans le même `ngOnInit()`.

Cela rend le fonctionnement plus difficile à suivre.

---

### Pays inexistant

Le pays est recherché avec `find()`.

Le code utilise ensuite directement :

`selectedCountry.country`

**Commentaire :**

`find()` peut ne trouver aucun pays.

Dans ce cas, `selectedCountry` peut être `undefined`
et le code risque de provoquer une erreur.

---

### Calculs directement dans le composant

Le nombre de participations, de médailles et d'athlètes
est calculé directement dans `CountryComponent`.

**Commentaire :**

Comme dans `HomeComponent`, beaucoup de logique liée aux données
se trouve directement dans le composant.

---

### Conversions inutiles

Le nombre de médailles et le nombre d'athlètes sont transformés
en chaînes de caractères avec `toString()`.

Ils sont ensuite reconvertis en nombres avec `parseInt()`
pour calculer leur somme.

**Commentaire :**

Ces conversions rendent le code plus compliqué alors que
les valeurs représentent à l'origine des nombres.

---

### `map()` inutile

Le code contient :

`participations.map((i) => i)`

Cette opération récupère chaque élément sans le modifier.

**Commentaire :**

Ce `map()` ne transforme pas les données.

Il semble donc inutile.

---

### `pipe()` vide

Comme dans `HomeComponent`, un `pipe()` vide est présent
avant `subscribe()`.

**Commentaire :**

Aucun opérateur RxJS n'est utilisé dans ce `pipe()`.

Il n'apporte donc rien.

---

### Router non utilisé

`Router` est injecté dans le constructeur de `CountryComponent`,
mais il n'est pas utilisé dans le composant.

**Commentaire :**

Cette dépendance semble inutile dans l'état actuel du code.

---

### Création du graphique dans le composant

`CountryComponent` crée directement son graphique Chart.js
avec la méthode `buildChart()`.

**Commentaire :**

Le composant gère à la fois les données du pays,
les calculs et le graphique.

---

## 3. HomeComponent HTML

### Titre dans un `div`

Le titre `titlePage` est affiché dans un simple `<div>`.

**Commentaire :**

Comme il s'agit d'un titre de la page,
une balise de titre HTML serait plus claire.

---

### Valeurs affichées directement

`totalCountries` et `totalJOs` sont initialisés à `0`
puis directement affichés.

**Commentaire :**

Pendant le chargement des données, l'utilisateur peut voir `0`
alors que les données ne sont simplement pas encore disponibles.

---

### Erreur non affichée

Le TypeScript possède une propriété `error`,
mais elle n'est pas utilisée dans le HTML.

**Commentaire :**

Si le chargement des données échoue,
aucun message d'erreur n'est visible sur la page.

---

### Graphique

Le canvas contient :

`{{ pieChart }}`

**Commentaire :**

Cette interpolation semble inutile.

Chart.js dessine directement le graphique dans le `<canvas>`.

---

## 4. CountryComponent HTML

### Affichage des statistiques

Les statistiques sont directement affichées avec :

- `totalEntries` ;
- `totalMedals` ;
- `totalAthletes`.

**Commentaire :**

Comme sur la page d'accueil, les valeurs peuvent être affichées
avant que les données soient réellement chargées.

---

### Erreur non affichée

La propriété `error` existe dans le composant,
mais elle n'est pas utilisée dans le HTML.

**Commentaire :**

L'utilisateur n'est pas informé lorsqu'une erreur
de chargement se produit.

---

### Pays introuvable non géré

Aucun message particulier n'est prévu dans le HTML
si le pays demandé n'existe pas.

**Commentaire :**

La page ne semble pas prévoir le cas où l'utilisateur arrive
sur l'URL d'un pays inexistant.

---

### Graphique

Le canvas contient :

`{{ lineChart }}`

**Commentaire :**

Cette interpolation semble inutile.

Chart.js utilise directement le canvas pour dessiner
le graphique.

---

### Code HTML similaire entre Home et Country

Les deux pages possèdent une structure assez proche
pour afficher leurs statistiques.

**Commentaire :**

Une partie du HTML et de la logique d'affichage semble répétée
entre les deux pages.

---

## 5. NotFoundComponent

### Constructeur vide

`NotFoundComponent` possède un constructeur vide :

`constructor() { }`

**Commentaire :**

Le constructeur ne contient aucune logique
et aucune dépendance n'est injectée.

Il semble donc inutile.

ESLint signale également ce problème.

---

### Lien "Go back"

La page contient :

`<a routerLink="">Go back</a>`

**Commentaire :**

Le texte "Go back" laisse penser que l'utilisateur va revenir
à la page précédente.

Cependant, le lien utilise une route Angular.

---

## 6. Organisation des fichiers

Les pages `home`, `country` et `not-found` sont regroupées
dans le dossier `pages`.

Je n'ai pas trouvé de dossier contenant des modèles
ou des services pour gérer les données olympiques.

**Commentaire :**

Cela explique en partie pourquoi `HomeComponent`
et `CountryComponent` récupèrent et manipulent directement
les données.

---

## 7. Résultat de ESLint

J'ai lancé la commande :

`ng lint`

ESLint a détecté 26 erreurs dans le projet.

Les principales erreurs concernent :

- l'utilisation de `any` ;
- des types écrits alors que TypeScript peut les déduire ;
- le constructeur vide de `NotFoundComponent`.

**Commentaire :**

Le résultat de ESLint confirme plusieurs problèmes remarqués
en parcourant les fichiers.

Les problèmes concernent principalement le typage du code.

---

## Conclusion

Après avoir parcouru le projet, j'ai principalement remarqué
que les composants ont beaucoup de responsabilités.

`HomeComponent` et `CountryComponent` récupèrent eux-mêmes
les données, effectuent les calculs et créent les graphiques.

J'ai également remarqué beaucoup de `any`, plusieurs morceaux
de code inutiles ou répétitifs, ainsi qu'une gestion des erreurs
et des observables qui pourrait être améliorée.

Cette analyse me permet d'identifier les parties
du projet qui devront être retravaillées pendant
la suite de la refactorisation.
---

# Etape 2 : Concevez une nouvelle architecture adaptée

## Nouvelle architecture proposée
```text
src/app/
│
├── components/
│   ├── stat-card/
│   │   ├── stat-card.component.ts
│   │   ├── stat-card.component.html
│   │   └── stat-card.component.scss
│   │
│   ├── medal-chart/
│   │   ├── medal-chart.component.ts
│   │   ├── medal-chart.component.html
│   │   └── medal-chart.component.scss
│   │
│   └── country-chart/
│       ├── country-chart.component.ts
│       ├── country-chart.component.html
│       └── country-chart.component.scss
│
├── pages/
│   ├── home/
│   │   ├── home.component.ts
│   │   ├── home.component.html
│   │   └── home.component.scss
│   │
│   ├── country/
│   │   ├── country.component.ts
│   │   ├── country.component.html
│   │   └── country.component.scss
│   │
│   └── not-found/
│       ├── not-found.component.ts
│       ├── not-found.component.html
│       └── not-found.component.scss
│
├── services/
│   └── data.service.ts
│
├── models/
│   ├── olympic.model.ts
│   └── participation.model.ts
│
├── app.component.ts
├── app.component.html
├── app.component.scss
├── app.module.ts
└── app-routing.module.ts
```
**Commentaire :**

Cette architecture permet de mieux comprendre le projet en séparant
les responsabilités de chaque partie de l'application.

Le dossier `pages` contient les pages de l'application, tandis que
le dossier `components` contient les composants réutilisables.

Le dossier `models` contient les interfaces qui définissent la
structure des données. Le dossier `services` centralise l'accès
aux données de l'application.

Cette organisation facilitera l'intégration d'un futur back-end.
Actuellement, les données proviennent d'un fichier JSON, mais
elles pourront ensuite être récupérées depuis une API REST.

Il suffira principalement de modifier le service pour communiquer
avec cette API, sans avoir à modifier tous les composants.





