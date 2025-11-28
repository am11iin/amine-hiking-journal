# 🌄 Amine Hiking Journal
Your personal hiking & adventure journal — modern, fast, and beautifully designed.

<p align="center">
  <img src="public/amine.png" width="200" style="border-radius:20px;" />
</p>

<p align="center">
  <b>React + Vite • TailwindCSS • Framer Motion</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-%5E18-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Vite-Fast-purple?style=for-the-badge" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Framer%20Motion-Animations-black?style=for-the-badge" />
</p>

---

## ✨ Aperçu

A modern web application to showcase all your hikes with:
- 📍 Locations  
- 🏃‍♂️ Distance  
- ⛰️ Altitude  
- 📅 Date  
- 🖼️ Image gallery  
- 🎨 Clean UI  
- ⚡ Ultra-fast performance  

---

## 🚀 Fonctionnalités

- 🎴 Cards de randonnées  
- 🏔️ Pages détaillées  
- 🖼️ Galerie d’images  
- ⚡ Animations fluides  
- 🎨 UI responsive (Tailwind)  
- 🔥 Build rapide avec Vite  
- 🗂️ Données organisées dans `hikes.js`

---

## 🧰 Tech Stack

| Tech | Usage |
|------|--------|
| **React** | Components & pages |
| **Vite** | Fast bundling |
| **TailwindCSS** | Styling |
| **Framer Motion** | Animations |
| **JavaScript ES6+** | Logic |

---

## 📥 Installation

```bash
git clone https://github.com/am11iin/amine-hiking-journal.git
cd amine-hiking-journal
npm install
npm run dev
👉 Ouvre ensuite :
http://localhost:5173

📦 Build Production
bash
Copy code
npm run build
npm run preview
📁 Structure du Projet
csharp
Copy code
amine-hiking-journal/
├─ public/
│  └─ images/             # Images & covers
├─ src/
│  ├─ components/         # UI components
│  ├─ pages/              # Pages (Home, Details…)
│  ├─ data/
│  │  └─ hikes.js         # List of hikes
│  ├─ assets/
│  ├─ App.jsx
│  └─ main.jsx
├─ package.json
├─ tailwind.config.js
└─ vite.config.js
🛠️ Customisation
➕ Ajouter une randonnée
Dans src/data/hikes.js :

js
Copy code
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
🎨 Thème & couleurs
Modifier tailwind.config.js

🖼️ Images
Ajouter tes photos dans public/images/

🤝 Contribution
Fork

Branch : feature/xxx

Commit

Pull Request ✔️

Toutes les idées sont les bienvenues.



Libre d’utilisation et modification.

📬 Contact
GitHub : am11iin

