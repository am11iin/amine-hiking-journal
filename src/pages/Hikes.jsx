import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mountain, Compass, Search, Sparkles } from 'lucide-react';
import HikeCard from "../components/HikeCard";
import { useHikes } from "../hooks/useHikes";

const Hikes = () => {
  const { hikes: hikesData, loading: isLoading, error } = useHikes();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHikes = hikesData.filter(hike => 
    hike.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hike.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Affichage du chargement
  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-beige/70 text-lg font-semibold">Chargement des aventures...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.main 
      className="pt-24 px-6 md:px-12 bg-primary min-h-screen pb-20 relative overflow-hidden text-beige"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Éléments de fond */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -top-40 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-semibold text-sm mb-4">
            <Compass className="w-4 h-4" />
            <span>Catalogue d'Exploration</span>
          </div>
          <h2 className="text-5xl font-extrabold text-accent mb-3 tracking-tight">Mes Randonnées</h2>
          <p className="text-xl text-beige/80 max-w-2xl mx-auto">Explorez mes aventures en montagne les plus mémorables</p>
        </motion.div>

        {/* Barre de Recherche et Filtres */}
        <motion.div 
          className="max-w-md mx-auto mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Search className="w-5 h-5 text-accent/70 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par nom ou région (ex: Tikjda, Béjaïa)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 rounded-2xl bg-primary/70 text-beige border border-accent/30 focus:outline-none focus:ring-2 focus:ring-accent/80 transition-all placeholder-beige/40 shadow-xl backdrop-blur-md"
          />
        </motion.div>

        {error && (
          <div className="mb-8 p-4 bg-red-900/30 border border-red-500 rounded-xl text-red-300 text-center">
            Erreur lors du chargement des données: {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredHikes.length > 0 ? (
            filteredHikes.map((hike, index) => (
              <motion.div 
                key={hike.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <HikeCard hike={hike} index={index} />
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="col-span-full text-center py-20 bg-primary/70 border border-accent/20 rounded-3xl shadow-xl p-8 backdrop-blur-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Mountain className="w-16 h-16 text-accent/70 mx-auto mb-6 opacity-80" />
              <p className="text-3xl text-beige font-bold mb-3">Aucune randonnée trouvée</p>
              <p className="text-lg text-beige/70 max-w-md mx-auto">
                {searchTerm ? `Aucun résultat pour "${searchTerm}". Essayez une autre recherche.` : 'Aucune randonnée enregistrée pour le moment.'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.main>
  );
};

export default Hikes;