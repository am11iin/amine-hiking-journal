// src/hooks/useHikes.js
import { useState, useEffect } from 'react';

// src/data/hikes.js
export const hikes = [
  {
    
  {
    id: 1,
    title: "Télésiège de Tikjda",
    location: "Tizi Ouzou",
    difficulty: "Moyen",
    date: "2024-03-01",
    distance: "12km",
    duration: "2h",
    altitude: "1800m",
    cover: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAA...", // base64 complet ici
    images: [
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD…"
    ],
    description:
      "La randonnée commence depuis la station du télésiège de Tikjda. Vous montez en télésiège pour profiter d’une vue panoramique sur les montagnes du Djurdjura. L’itinéraire traverse des forêts de cèdres et des pâturages alpins avec des panoramas magnifiques.",
    review:
      "Le télésiège rend la randonnée accessible même aux débutants. Les sentiers sont bien entretenus et les paysages superbes.",
    advice:
      "Chaussures de randonnée, vêtements chauds, vérifier les horaires du télésiège, rester sur les sentiers balisés."
  },
  {
    id: 2,
    title: "Camping Lac Noir – Akfadou",
    location: "Lac Noir, Akfadou, Béjaïa",
    altitude: "1100 m",
    distance: "10 km",
    duration: "2 h",
    difficulty: "Facile",
    date: "2023-11-01",
    description:
      "Le Lac Noir à Akfadou, à 1 100 m d’altitude, est un endroit paisible et parfait pour un camping de 2 jours. Le site est entouré de pins et de montagnes, idéal pour se détendre et randonner.",
    review:
      "Endroit calme et ressourçant, idéal pour un weekend nature.",
    equipment:
      "Tente + piquets + tapis de sol\nSac de couchage adapté à la saison\nMatelas gonflable ou mousse\nLampe frontale + piles\nVêtements chauds\nChaussures de randonnée\nVeste coupe-vent\nMaillot de bain\nCouteau multifonctions",
    cover: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAc0...",
    images: [
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAc0A..."
    ]
  }
];


export function useHikes() {
  const [hikes, setHikes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger depuis localStorage
    const saved = localStorage.getItem('hikesData');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setHikes(data);
      } catch (e) {
        console.error('Erreur parsing localStorage:', e);
        setHikes(defaultHikes);
        localStorage.setItem('hikesData', JSON.stringify(defaultHikes));
      }
    } else {
      // Initialiser avec les données par défaut
      setHikes(defaultHikes);
      localStorage.setItem('hikesData', JSON.stringify(defaultHikes));
    }
    setLoading(false);
  }, []);

  return { hikes, loading, defaultHikes };
}

