import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Calendar, ArrowRight, TrendingUp, Loader2 } from 'lucide-react'; 

const getDifficultyColor = (difficulty) => {
  switch(difficulty?.toLowerCase()) {
    case 'facile':
      return 'bg-green-600/90 text-white';
    case 'moyen':
      return 'bg-amber-600/90 text-white';
    case 'difficile':
      return 'bg-red-600/90 text-white';
    default:
      return 'bg-gray-600/90 text-white';
  }
};

export default function HikeCard({ hike, index = 0 }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!hike) return null;

  const handleImageError = (e) => {
    e.target.src = '/hike1.webp';
    setImageLoaded(true);
  };

  return (
    <motion.article
      className="relative overflow-hidden rounded-2xl bg-primary/70 backdrop-blur-md border border-accent/20 hover:border-accent/60 transition-all duration-300 group h-full flex flex-col shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4, boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.6)' }}
    >
      {/* 1. Image Container avec Skeleton Animated */}
      <div className="relative h-48 sm:h-56 md:h-60 overflow-hidden bg-primary/90">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-primary/90 animate-pulse flex items-center justify-center border-b border-accent/10">
            <Loader2 className="w-7 h-7 text-accent/60 animate-spin" />
          </div>
        )}
        <motion.img
          src={hike.cover || '/hike1.webp'}
          alt={`${hike.title || 'Randonnée'} - Couverture`}
          className={`w-full h-full object-cover transition-opacity duration-500 group-hover:scale-[1.06] ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={handleImageError}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-90 pointer-events-none" /> 
        
        {/* Difficulty Badge */}
        <div 
          className={`absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-xs font-bold shadow-lg backdrop-blur-md flex items-center gap-1 border border-white/10 ${getDifficultyColor(hike.difficulty)}`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          {hike.difficulty || 'N/A'}
        </div>
      </div>
      
      {/* 2. Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <h3 className="text-xl sm:text-2xl font-extrabold text-beige mb-3 line-clamp-2 leading-snug">
          {hike.title || 'Titre non disponible'}
        </h3>
        
        {/* Meta Data */}
        <div className="space-y-2 mb-5 text-xs sm:text-sm text-beige/70">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
            <p className="truncate font-medium text-beige/90">{hike.location || 'Lieu non spécifié'}</p>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-accent flex-shrink-0" />
            <p className="truncate">{hike.duration || 'Durée non précisée'}</p>
          </div>
          <div className="flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-accent flex-shrink-0" />
            <p className="truncate">{hike.date ? new Date(hike.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric' }) : 'Date non spécifiée'}</p>
          </div>
        </div>

        {/* Bouton CTA */}
        <Link 
          to={`/hikes/${hike.id}`}
          className="mt-auto w-full py-3 bg-accent hover:bg-accent/90 text-primary font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          Explorer le circuit
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.article>
  );
}