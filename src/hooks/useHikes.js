// src/hooks/useHikes.js
import { useState, useEffect } from 'react';

const defaultHikes = [
  {
    id: 1,
    title: "Montagne de l'Aurès",
    location: "Aurès, Algérie",
    difficulty: "Moyen",
    date: "2025-07-12",
    distance: "12 km",
    duration: "5h",
    altitude: "1800m",
    cover: "/hikes/hike1.jpg",
    images: ["/hikes/hike1.jpg", "/hikes/hike2.jpg", "/hikes/hike3.jpg"],
    description: "Randonnée incroyable avec vues panoramiques sur les montagnes de l'Aurès. Des paysages à couper le souffle vous attendent à chaque tournant.",
    review: "Superbe expérience, prévoir de l'eau et des snacks. J'ai passé une journée mémorable entouré de nature sauvage.",
    advice: "Porter des chaussures adaptées, éviter après pluie. Apportez une caméra pour capturer les couchers de soleil magnifiques."
  },
  {
    id: 2,
    title: "Chaîne de l'Atlas",
    location: "Atlas, Algérie",
    difficulty: "Difficile",
    date: "2025-06-20",
    distance: "15 km",
    duration: "7h",
    altitude: "2500m",
    cover: "/hikes/hike2.jpg",
    images: ["/hikes/hike2.jpg", "/hikes/hike3.jpg", "/hikes/hike4.jpg"],
    description: "Ascension technique avec paysages grandioses. Une randonnée pour les amateurs de défis et de vues époustouflantes.",
    review: "Exigeant mais très gratifiant. Vous revenir transformé par cette expérience.",
    advice: "Apporter bâtons de randonnée et vêtements chauds. Départ tôt le matin pour maximiser le temps."
  },
  {
    id: 3,
    title: "Pic du Tassili",
    location: "Tassili n'Ajjer, Algérie",
    difficulty: "Facile",
    date: "2025-05-15",
    distance: "8 km",
    duration: "3h",
    altitude: "1200m",
    cover: "/hikes/hike3.jpg",
    images: ["/hikes/hike3.jpg", "/hikes/hike4.jpg", "/hikes/hike5.jpg"],
    description: "Une randonnée facile parfaite pour débuter. Les formations rocheuses sont étonnantes et les paysages désertiques hypnotisants.",
    review: "Très accessible et agréable. Idéale en famille.",
    advice: "Apportez protection solaire et chapeau. L'eau est essentielle dans le désert."
  },
  {
    id: 4,
    title: "Mont Djelifa",
    location: "Kabylie, Algérie",
    difficulty: "Moyen",
    date: "2025-08-10",
    distance: "10 km",
    duration: "4h",
    altitude: "1600m",
    cover: "/hikes/hike4.jpg",
    images: ["/hikes/hike4.jpg", "/hikes/hike5.jpg", "/hikes/hike1.jpg"],
    description: "Randonnée dans la forêt de Kabylie avec des vues somptueuses sur la vallée. Idéale pour les amoureux de nature.",
    review: "Un vrai coup de cœur ! Faune et flore variées.",
    advice: "Apporter repellent anti-insectes. Attention aux chemins glissants après pluie."
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
