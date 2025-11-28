import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Mountain, Ruler, AlertTriangle, ChevronLeft, ChevronRight, Hash } from 'lucide-react'; // Ajout d'icônes
import { hikes } from '../data/hikes';
import Gallery from '../components/Gallery'; // Assurez-vous que ce composant existe

// Classes de style communes pour l'UI
const CARD_CLASS = "bg-primary/50 border border-accent/20 backdrop-blur-md rounded-3xl p-6 md:p-8 shadow-xl";
const INFO_ITEM_CLASS = "flex items-center gap-3 text-lg font-semibold";

const HikeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Récupérer d'abord les randonnées depuis le localStorage si présentes
  const stored = typeof window !== 'undefined' ? localStorage.getItem('hikesData') : null;
  // Utilise les données stockées si elles existent, sinon les données par défaut
  const allHikes = stored ? JSON.parse(stored) : hikes;

  const hike = allHikes.find(h => String(h.id) === String(id));
  
  // Utiliser la première image comme fallback pour la galerie si 'images' est manquant
  const images = hike?.images && hike.images.length > 0 ? hike.images : [hike?.cover || '/placeholder-hike.jpg'];

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Logique pour la couleur de difficulté
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Facile':
        return 'bg-green-600/20 text-green-400 border-green-600';
      case 'Moyen':
        return 'bg-yellow-600/20 text-yellow-400 border-yellow-600';
      case 'Difficile':
        return 'bg-red-600/20 text-red-400 border-red-600';
      default:
        return 'bg-beige/20 text-beige border-beige/40';
    }
  };

  // --- Affichage Randonnée Introuvable ---
  if (!hike) {
    return (
      <motion.main 
        className="min-h-screen bg-primary flex items-center justify-center p-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="max-w-md bg-primary/80 p-10 rounded-xl border border-accent/20 shadow-2xl">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-3xl font-bold text-beige mb-4">Randonnée introuvable</h1>
          <p className="text-beige/70 mb-8">La randonnée que vous recherchez n'existe pas ou a été déplacée.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent rounded-lg transition-all duration-300 flex items-center gap-2 mx-auto font-semibold"
          >
            <ArrowLeft size={18} />
            Retour aux randonnées
          </button>
        </div>
      </motion.main>
    );
  }
  
  // --- Affichage Chargement ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-beige/70 text-lg font-semibold">Chargement de l'aventure...</p>
        </div>
      </div>
    );
  }

  // --- Affichage Détails ---
  return (
    <motion.main
      className="min-h-screen bg-primary pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-beige"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {/* ... (Animations de fond conservées) ... */}
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
          animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Back button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center text-beige/70 hover:text-accent transition-colors group font-semibold"
          whileHover={{ x: -4 }}
        >
          <ArrowLeft size={20} className="mr-2 group-hover:scale-110 transition-transform" />
          Retour aux randonnées
        </motion.button>

        {/* Header (Titre & Info Clés) */}
        <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
        >
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 leading-tight">{hike.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 md:gap-8 text-beige/80">
                <div className={INFO_ITEM_CLASS}>
                    <MapPin className="text-accent w-5 h-5" />
                    <span className="text-beige">{hike.location}</span>
                </div>
                <div className={INFO_ITEM_CLASS}>
                    <Clock className="text-accent w-5 h-5" />
                    <span>Posté le {hike.date}</span>
                </div>
                <div className={INFO_ITEM_CLASS}>
                    <Mountain className="text-accent w-5 h-5" />
                    <span 
                        className={`px-3 py-1 text-sm font-bold rounded-full border ${getDifficultyColor(hike.difficulty)}`}
                    >
                        {hike.difficulty}
                    </span>
                </div>
            </div>
        </motion.div>

        {/* Gallery Section */}
        <motion.div 
          className="relative rounded-3xl overflow-hidden mb-16 shadow-2xl bg-primary/70 border border-accent/20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative h-[400px] sm:h-[550px] lg:h-[650px] w-full">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`${hike.title} - ${currentImageIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 0 }} // Désactiver le décalage x pour ne pas bouger l'image à l'exit
                transition={{ duration: 0.4 }}
                onError={(e) => {
                  e.target.src = '/placeholder-hike.jpg';
                  e.target.className = 'absolute inset-0 w-full h-full object-contain bg-primary/20 p-12'; // Ajustement de la classe en cas d'erreur
                }}
              />
            </AnimatePresence>
            
            {/* Navigation Arrows (Plus élégantes) */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-accent/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label="Image précédente"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-accent/80 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label="Image suivante"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
            
            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black/60 text-white text-sm px-4 py-1 rounded-full backdrop-blur-sm font-semibold">
                {currentImageIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </motion.div>

        {/* Description et Détails Techniques */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
            
            {/* Section Description */}
            <motion.div
                className="lg:col-span-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <h2 className="text-4xl font-bold text-accent mb-6 flex items-center gap-3">📝 Description de la Randonnée</h2>
                <div className={`${CARD_CLASS} text-lg text-beige/90 leading-relaxed`}>
                    <p className="whitespace-pre-line">{hike.description}</p>
                </div>
            </motion.div>

            {/* Fiche Technique */}
            <motion.div
                className="lg:col-span-1"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <h2 className="text-4xl font-bold text-accent mb-6 flex items-center gap-3">📊 Fiche Technique</h2>
                <div className={`${CARD_CLASS} space-y-4`}>
                    {[
                        { icon: Ruler, label: "Distance totale", value: hike.distance },
                        { icon: Clock, label: "Durée estimée", value: hike.duration },
                        { icon: Mountain, label: "Point culminant", value: hike.altitude },
                        { icon: Hash, label: "ID Randonnée", value: hike.id },
                    ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-accent/10 pb-2 last:border-b-0 last:pb-0">
                            <div className="flex items-center gap-3 text-beige/70">
                                <item.icon className="w-5 h-5 text-accent" />
                                <span>{item.label}</span>
                            </div>
                            <span className="font-bold text-beige">{item.value}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>

        {/* Avis Personnel */}
        <motion.div
          className="mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="text-4xl font-bold mb-6 flex items-center gap-3">⭐ Avis Personnel</h3>
          <p className={`${CARD_CLASS} text-lg text-beige/90 leading-relaxed border-l-4 border-accent/80`}>
            {hike.review}
          </p>
        </motion.div>

        {/* Conseils */}
        <motion.div
          className="mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="text-4xl font-bold mb-6 flex items-center gap-3">💡 Conseils Utiles</h3>
          <p className={`${CARD_CLASS} text-lg text-beige/90 leading-relaxed border-l-4 border-accent/80`}>
            {hike.advice}
          </p>
        </motion.div>

        {/* Galerie (Si vous utilisez un composant Gallery séparé) */}
        {/*
        <motion.div
          className="mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h3 className="text-4xl font-bold mb-8 flex items-center gap-3">📸 Galerie Photos</h3>
          <Gallery images={images} />
        </motion.div>
        */}

        {/* Carte Google (Correction de l'URL) */}
        <motion.div
          className="mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-4xl font-bold mb-8 flex items-center gap-3">🗺️ Localisation</h3>
          <div className="rounded-3xl overflow-hidden shadow-glow-lg">
            <iframe
              // Nouvelle structure d'URL pour un embed Google Maps basé sur une requête
              // Assurez-vous que le composant est monté côté client avant d'exécuter cette ligne
              src={`https://maps.google.com/maps?q=${encodeURIComponent(hike.location)}&output=embed`}
              className="w-full h-96 rounded-3xl border-2 border-accent/20"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Carte de ${hike.location}`}
            ></iframe>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
};

export default HikeDetails;