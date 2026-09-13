import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Maximize2, Image as ImageIcon, Loader2 } from "lucide-react";

function GalleryThumbnail({ img, index, onSelect }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group cursor-pointer relative"
      onClick={() => onSelect(img)}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-xl border border-accent/20 bg-primary/90 aspect-square">
        {!isLoaded && (
          <div className="absolute inset-0 bg-primary/90 animate-pulse flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-accent/60 animate-spin" />
          </div>
        )}
        <img 
          src={img} 
          alt={`Galerie photo ${index + 1}`} 
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            e.target.src = '/hike1.webp';
            setIsLoaded(true);
          }}
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-semibold text-sm border border-white/40 rounded-full px-4 py-1.5 backdrop-blur-md flex items-center gap-2">
            <Maximize2 className="w-4 h-4 text-accent" /> Agrandir
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery({ images }) {
  const [selected, setSelected] = useState(null);

  const validImages = images && images.filter(img => img && typeof img === 'string' && img.trim());

  if (!validImages || validImages.length === 0) {
    return (
      <motion.div 
        className="text-center py-20 bg-primary/60 border border-accent/20 rounded-3xl shadow-xl mx-auto max-w-4xl backdrop-blur-md p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ImageIcon className="w-16 h-16 text-accent/70 mx-auto mb-4 opacity-80" />
        <p className="text-beige text-2xl font-bold">Galerie de photos</p>
        <p className="text-beige/60 mt-2">Aucune image n'a été ajoutée pour le moment.</p>
      </motion.div>
    );
  }

  return (
    <div className="py-4"> 
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-md flex justify-center items-center z-50 p-4 cursor-zoom-out"
            onClick={() => setSelected(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-h-[95vh] max-w-[95vw] shadow-2xl rounded-2xl overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()} 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <img 
                src={selected} 
                alt="Zoom sur l'image" 
                className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl"
                onError={(e) => {
                  e.target.src = '/hike1.webp';
                }}
              />
              <button
                className="absolute top-4 right-4 text-white bg-black/60 hover:bg-accent hover:text-primary rounded-full p-2.5 transition-colors border border-white/20"
                onClick={() => setSelected(null)}
                aria-label="Fermer la galerie"
              >
                <X className="w-6 h-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
        {validImages.map((img, i) => (
          <GalleryThumbnail 
            key={i} 
            img={img} 
            index={i} 
            onSelect={setSelected} 
          />
        ))}
      </div>
    </div>
  );
}