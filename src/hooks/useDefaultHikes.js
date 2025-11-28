import { images } from '../config/images.js';

export const defaultHikes = [
  {
    id: 1,
    title: "Montagne de l'Aurès",
    location: "Aurès, Algérie",
    difficulty: "Moyen",
    date: "2025-07-12",
    distance: "12 km",
    duration: "5h",
    altitude: "1800m",
    cover: images[0],
    images: [images[0], images[1], images[2]],
    description: "Randonnée incroyable avec vues panoramiques sur les montagnes de l'Aurès.",
    review: "Superbe expérience, prévoir de l'eau et des snacks.",
    advice: "Porter des chaussures adaptées, éviter après pluie."
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
    cover: images[1],
    images: [images[1], images[2], images[3]],
    description: "Ascension technique avec paysages grandioses.",
    review: "Exigeant mais très gratifiant.",
    advice: "Apporter bâtons de randonnée et vêtements chauds."
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
    cover: images[2],
    images: [images[2], images[3], images[4]],
    description: "Une randonnée facile parfaite pour débuter.",
    review: "Très accessible et agréable.",
    advice: "Apportez protection solaire et chapeau."
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
    cover: images[3],
    images: [images[3], images[4], images[0]],
    description: "Randonnée dans la forêt de Kabylie.",
    review: "Un vrai coup de cœur ! Faune et flore variées.",
    advice: "Apporter repellent anti-insectes."
  }
];
