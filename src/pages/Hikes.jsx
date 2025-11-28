import React from 'react';
import { motion } from 'framer-motion';
import { Mountain } from 'lucide-react';
import HikeCard from "../components/HikeCard";
// Assurez-vous que HikeCard utilise correctement les classes primary/beige/accent

const Hikes = () => {
  // Utilisez un état initial vide et ajoutez les données par défaut/simulées pour le développement
  const [hikesData, setHikes] = React.useState([]);

  // État de chargement initial pour une meilleure UX
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simuler un léger délai de chargement pour montrer l'effet
    const loadTimer = setTimeout(() => {
      const saved = localStorage.getItem('hikesData');
      if (saved) {
        setHikes(JSON.parse(saved));
      }
      setIsLoading(false);
    }, 500); // 500ms de délai de chargement simulé

    return () => clearTimeout(loadTimer);
  }, []);

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
      // Remplacement de bg-gradient-hero par bg-primary et text-beige
      className="pt-24 px-6 md:px-12 bg-primary min-h-screen pb-20 relative overflow-hidden text-beige"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Éléments de fond (Conservés) */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-40 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Remplacement des classes section-title et section-subtitle */}
          <h2 className="text-5xl font-extrabold text-accent mb-3">Mes Randonnées</h2>
          <p className="text-xl text-beige/80">Explorez mes aventures montagne les plus mémorables</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {hikesData.length > 0 ? (
            hikesData.map((hike, index) => (
              <motion.div 
                key={hike.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                // Utiliser une balise <Link> autour du HikeCard si possible pour la navigation
              >
                <HikeCard hike={hike} index={index} />
              </motion.div>
            ))
          ) : (
            // Style de l'état vide amélioré
            <motion.div 
              className="col-span-full text-center py-20 bg-primary/70 border border-accent/20 rounded-3xl shadow-xl p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Mountain className="w-16 h-16 text-accent/70 mx-auto mb-6" />
              <p className="text-3xl text-beige font-bold mb-3">Pas d'aventures, pas d'histoires !</p>
              <p className="text-lg text-beige/70">
                Aucune randonnée n'a été ajoutée pour le moment.
                <br />
                Veuillez vous rendre sur la page Admin pour enregistrer votre première exploration ! 🏔️
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.main>
  );
};

export default Hikes;