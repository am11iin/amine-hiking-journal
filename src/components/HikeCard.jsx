import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
// Icônes conservées, elles sont déjà professionnelles
import { MapPin, Clock, Calendar, ArrowRight, TrendingUp } from 'lucide-react'; 

// Ajustement des couleurs pour être plus sobres et modernes, mais fonctionnelles
const getDifficultyColor = (difficulty) => {
  switch(difficulty?.toLowerCase()) {
    case 'facile':
      return 'bg-green-600'; // Vert plus profond
    case 'moyen':
      return 'bg-yellow-500'; // Jaune standard
    case 'difficile':
      return 'bg-red-600'; // Rouge plus profond
    default:
      return 'bg-gray-500';
  }
};

export default function HikeCard({ hike, index = 0 }) {
  if (!hike) return null;

  const handleImageError = (e) => {
    // Style de placeholder épuré
    e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231f2937"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="10" font-family="sans-serif" fill="%236b7280">Image+Randonnée</text></svg>';
    e.target.className = 'w-full h-full object-cover p-8 bg-gray-900';
  };

  return (
    <motion.article
      // Amélioration de la carte : bordures plus subtiles, effet de profondeur
      className="relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-md border border-gray-700/50 hover:border-accent transition-all duration-300 group h-full flex flex-col shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      // Effet de survol plus élégant (légère élévation et ombre intérieure subtile)
      whileHover={{ y: -5, boxShadow: '0 15px 25px -5px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.05)' }}
    >
      {/* 1. Image Container */}
      <div className="relative h-64 overflow-hidden"> {/* Hauteur légèrement augmentée pour plus d'impact */}
        <motion.img
          src={hike.cover || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231f2937"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="10" font-family="sans-serif" fill="%236b7280">Image+Randonnée</text></svg>'}
          alt={`${hike.title || 'Randonnée'} - Couverture`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]" // Zoom légèrement accru
          loading="lazy"
          onError={handleImageError}
          initial={{ opacity: 0.9 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        
        {/* Gradient Overlay pour lisibilité du badge */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" /> 
        
        {/* Difficulty Badge (position et style raffinés) */}
        <motion.div 
          className={`absolute bottom-4 right-4 px-3 py-1 rounded-lg text-xs font-bold text-white shadow-md flex items-center gap-1 ${getDifficultyColor(hike.difficulty)}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <TrendingUp className="w-3 h-3" />
          {hike.difficulty || 'N/A'}
        </motion.div>
      </div>
      
      {/* 2. Card Content */}
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-2xl font-extrabold text-white mb-3 line-clamp-2">
          {hike.title || 'Titre non disponible'}
        </h3>
        
        {/* Meta Data */}
        <div className="space-y-3 mb-6 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-accent" />
            <p className="truncate font-medium">{hike.location || 'Lieu non spécifié'}</p>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-accent" />
            <p>{hike.duration || 'Durée non précisée'}</p>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-accent" />
            <p>{hike.date ? new Date(hike.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Date non spécifiée'}</p>
          </div>
        </div>

        {/* Bouton Voir plus (CTA) */}
        <Link 
          to={`/hikes/${hike.id}`}
          // Bouton stylisé, utilise la couleur d'accentuation pour le thème
          className="mt-auto py-3 bg-accent hover:bg-accent/80 text-primary font-bold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform group-hover:translate-y-0.5 flex items-center justify-center gap-2"
        >
          Explorer le circuit
          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.article>
  );
}