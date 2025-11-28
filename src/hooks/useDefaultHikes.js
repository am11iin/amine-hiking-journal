import { images } from '../config/images.js';

export const defaultHikes = [
  {
    id: 1,
    title: "Camping Lac Noir – Akfadou",
    location: "Lac Noir, Akfadou, Béjaïa",
    difficulty: "facile",
    date: "2023-11-01",
    distance: "10km",
    duration: "2h",
    altitude: "1100m",
    cover: images[0],
    images: [images[0], images[1], images[2], images[3], images[4], images[5], images[6]],
    description:
      "Le Lac Noir à Akfadou, à 1 100 m d’altitude, est un endroit paisible et parfait pour un camping de 2 jours. Le site est entouré de pins et de montagnes, idéal pour se détendre et randonner.",
    review: "Endroit calme et ressourçant, idéal pour un weekend nature.",
    advice:
      "Tente + piquets + tapis de sol\nSac de couchage adapté à la saison\nMatelas gonflable ou mousse\nLampe frontale + piles\nVêtements chauds\nChaussures de randonnée\nVeste coupe-vent\nMaillot de bain\nCouteau multifonctions"
  },

  {
    id: 2,
    title: "Télésiège de Tikjda",
    location: "Djurdjura, Bouira",
    difficulty: "Moyen",
    date: "2024-03-01",
    distance: "12 km",
    duration: "2h",
    altitude: "1800m",
    cover: images[14],
    images: [images[7], images[8], images[9]],
    description:
      "La randonnée commence depuis la station du télésiège de Tikjda. Vous montez en télésiège pour profiter d’une vue panoramique sur les montagnes du Djurdjura. L’itinéraire traverse des forêts de cèdres et des pâturages alpins avec des panoramas magnifiques.",
    review:
      "Le télésiège rend la randonnée accessible même aux débutants. Les sentiers sont bien entretenus et les paysages superbes.",
    advice:
      "Chaussures de randonnée, vêtements chauds, vérifier les horaires du télésiège, rester sur les sentiers balisés."
  },


];
