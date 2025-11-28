import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Gallery({ images }) {
  const [selected, setSelected] = useState(null);

  // Filtrer les images vides
  const validImages = images && images.filter(img => img && img.trim());

  // --- Affichage pour aucune image ---
  if (!validImages || validImages.length === 0) {
    return (
      <motion.div 
        className="text-center py-20 bg-gray-50 rounded-xl shadow-inner mx-auto max-w-4xl" // Conteneur plus défini
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-gray-500 text-xl font-semibold">📸 Galerie vide</p>
        <p className="text-gray-400 mt-2">Aucune image n'a été trouvée pour cette collection.</p>
      </motion.div>
    );
  }

  // --- Composant principal de la Galerie ---
  return (
    <div className="py-8"> 
      {/* 1. Modale/Lightbox pour l'image sélectionnée */}
      <AnimatePresence>
        {selected && (
          <motion.div
            // Design Lightbox : sombre, centré, clic pour fermer
            className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 p-4 cursor-zoom-out"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-h-[95%] max-w-[95%] shadow-2xl rounded-xl overflow-hidden"
              // Empêche la fermeture de la modale en cliquant sur l'image elle-même
              onClick={(e) => e.stopPropagation()} 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <img 
                src={selected} 
                alt="Zoom sur l'image" 
                className="max-h-[90vh] max-w-[90vw] object-contain" // Utilisation de vh/vw pour une meilleure adaptation
                onError={(e) => {
                  console.error('Image load error:', selected);
                  // Remplacement par une image de fallback plus neutre
                  e.target.src = 'https://via.placeholder.com/150/CCCCCC/808080?text=Image+Non+Disponible'; 
                  e.target.className = 'w-64 h-64 object-cover p-4 bg-gray-200'; // Style pour le fallback
                }}
              />
              <button
                className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => setSelected(null)}
                aria-label="Fermer la galerie"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Grille de la Galerie */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {validImages.map((img, i) => (
          <motion.div 
            key={i} 
            // Amélioration de l'effet d'hover : plus subtil et élégant
            whileHover={{ scale: 1.03, boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)" }} 
            // whileTap pour un feedback tactile
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="group cursor-pointer relative"
            onClick={() => setSelected(img)}
          >
            <div className="relative overflow-hidden rounded-xl shadow-md bg-gray-100 aspect-square"> {/* Aspect ratio carré pour uniformité */}
              <img 
                src={img} 
                alt={`Galerie image ${i + 1}`} 
                // Hauteur dynamique via aspect-square, object-cover obligatoire
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                onError={(e) => {
                  console.error('Image error:', img);
                  // Placeholder stylisé en cas d'erreur
                  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0f0f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="14" font-family="sans-serif" fill="%23999999">Erreur</text></svg>';
                  e.target.className = 'w-full h-full object-contain p-4 bg-gray-200';
                }}
                loading="lazy"
              />
              
              {/* Overlay pour l'indication d'action (plus moderne) */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white font-medium text-lg border border-white/50 rounded-full px-4 py-1 backdrop-blur-sm">Agrandir</p>
              </div>
            </div>
            
            {/* Ajout d'un détail élégant au survol */}
            <div className="absolute inset-0 border-4 border-transparent group-hover:border-indigo-500 rounded-xl transition-all duration-300 pointer-events-none"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}