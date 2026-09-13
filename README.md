<div align="center">

# Amine Hiking Journal

**Un carnet de randonnée moderne pour immortaliser et partager vos aventures en montagne.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Fast-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-Animations-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Netlify Status](https://img.shields.io/badge/Deployed-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://amine-hiking-journal.netlify.app/)

[Voir la démo en ligne](https://amine-hiking-journal.netlify.app/) · [Signaler un bug](https://github.com/am11iin/amine-hiking-journal/issues) · [Proposer une fonctionnalité](https://github.com/am11iin/amine-hiking-journal/issues)

</div>

---

## Aperçu

<div align="center">
  <img src="public/amine.png" alt="Aperçu du site Amine Hiking Journal" width="800"/>
</div>

> Remplacez cette image par une capture d'écran ou un GIF de démonstration à jour du site.

---

## Fonctionnalités

- Cartes de randonnées — vue d'ensemble claire de chaque sortie
- Pages détaillées — infos complètes par randonnée (lieu, distance, altitude, durée, date)
- Galerie photo — plusieurs images par randonnée
- Animations fluides — transitions soignées via Framer Motion
- Design responsive — expérience optimisée sur mobile, tablette et desktop
- Performances élevées — build ultra-rapide grâce à Vite
- Données centralisées — gestion simple des randonnées via un fichier de données unique

---

## Stack technique

| Technologie | Rôle |
|---|---|
| React | Composants et logique d'interface |
| Vite | Bundler et serveur de développement |
| TailwindCSS | Système de style utilitaire |
| Framer Motion | Animations et transitions |
| JavaScript (ES6+) | Logique applicative |
| Netlify | Hébergement et déploiement continu |

---

## Démarrage rapide

### Prérequis

- [Node.js](https://nodejs.org/) v18 ou supérieur
- npm ou yarn

### Installation

```bash
# Cloner le dépôt
git clone https://github.com/am11iin/amine-hiking-journal.git
cd amine-hiking-journal

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application est alors disponible sur http://localhost:5173

### Build de production

```bash
npm run build
npm run preview
```

---

## Structure du projet

```
amine-hiking-journal/
├─ public/
│  └─ images/              # Images et couvertures des randonnées
├─ src/
│  ├─ components/          # Composants UI réutilisables
│  ├─ pages/                # Pages de l'application (Accueil, Détails…)
│  ├─ data/
│  │  └─ hikes.js          # Données des randonnées
│  ├─ assets/               # Ressources statiques
│  ├─ App.jsx
│  └─ main.jsx
├─ package.json
├─ tailwind.config.js
└─ vite.config.js
```

---

## Personnalisation

### Ajouter une randonnée

Éditez `src/data/hikes.js` et ajoutez un nouvel objet :

```js
{
  id: 1,
  title: "Akouker - Djurdjura",
  location: "Tizi-Ouzou",
  distance: "12 km",
  duration: "5h",
  altitude: "2300m",
  date: "2025-01-20",
  cover: "/hikes/hike1.jpg",
  images: [
    "/hikes/hike1.jpg",
    "/hikes/hike1-2.jpg"
  ]
}
```

### Modifier le thème

Les couleurs, typographies et espacements se configurent dans `tailwind.config.js`.

### Ajouter des images

Placez vos photos dans `public/images/` puis référencez-les dans `hikes.js`.

---

## Roadmap

- [ ] Carte interactive des itinéraires (Leaflet)
- [ ] Compteur de visiteurs
- [ ] Optimisation SEO (meta tags, Open Graph)
- [ ] Lazy loading des images
- [ ] Mode sombre

---

## Contribuer

Les contributions sont les bienvenues.

1. Forkez le projet
2. Créez votre branche (`git checkout -b feature/ma-fonctionnalite`)
3. Commitez vos changements (`git commit -m 'Ajout de ma fonctionnalité'`)
4. Poussez la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvrez une Pull Request

---

## Licence

Ce projet est libre d'utilisation et de modification.

---

## Contact

**Amine** — [@am11iin](https://github.com/am11iin)

Lien du projet : [github.com/am11iin/amine-hiking-journal](https://github.com/am11iin/amine-hiking-journal)

<div align="center">

Fait avec passion et beaucoup de kilomètres de marche

</div>
