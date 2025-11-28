import React from 'react';
import { motion } from "framer-motion";
import Gallery from "../components/Gallery";
import { images } from "../config/images"; // Assurez-vous que ce fichier exporte un tableau d'URLs

export default function Portfolio() {
  return (
    <motion.main 
      // Remplacement de bg-gradient-hero par bg-primary pour la cohérence du thème sombre
      className="pt-24 px-6 md:px-12 bg-primary min-h-screen text-beige pb-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Éléments de fond (Conservés) */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Remplacement des classes section-title et section-subtitle */}
          <h2 className="text-5xl font-extrabold text-accent mb-3">Portfolio Global</h2>
          <p className="text-xl text-beige/80">Découvrez tous les moments magiques capturés</p>
        </motion.div>

        {/* Le composant Gallery doit gérer la mise en page (ex: grille) 
          et l'affichage des images avec des animations.
        */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <Gallery images={images} />
        </motion.div>
      </div>
    </motion.main>
  );
}