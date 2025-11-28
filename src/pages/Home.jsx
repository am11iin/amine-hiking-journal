import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Home = () => {
  return (
    <motion.main 
      // Remplacement de bg-gradient-hero par bg-primary pour la cohérence du thème sombre
      className="pt-24 bg-primary min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden text-beige"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Background elements with improved animation */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"
          animate={{
            y: [0, -15, 0],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.div 
        className="text-center max-w-4xl relative z-10 px-4"
        variants={container}
      >
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl font-black text-beige mb-6 leading-tight"
          variants={item}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/70">
            Explorer la Montagne
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl font-semibold mb-8"
          variants={item}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-beige/90 to-beige/60">
            Vivrez, respirer, capturer l'essence des sommets
          </span>
        </motion.p>

        <motion.p 
          className="text-lg text-beige/80 mb-12 leading-relaxed max-w-2xl mx-auto"
          variants={item}
        >
          Découvrez mes aventures épiques à travers les montagnes algériennes. Chaque randonnée raconte une histoire, chaque sommet offre une vue inoubliable et des souvenirs éternels.
        </motion.p>

        {/* Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          variants={item}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link 
              to="/hikes"
              // Le style du bouton principal est parfait : accent pour la visibilité
              className="inline-flex items-center justify-center gap-3 text-lg px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 transition-all duration-300 shadow-lg shadow-accent/20 text-primary font-bold"
            >
              <span>🥾</span>
              <span>Voir mes randonnées</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link 
              to="/portfolio"
              // Le style du bouton secondaire est excellent pour un fond sombre (verre/neomorphisme)
              className="inline-flex items-center justify-center gap-3 text-lg px-8 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 text-beige font-semibold"
            >
              <span>📸</span>
              <span>Portfolio</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto w-full"
          variants={item}
        >
          {[
            { 
              label: "Randonnées", 
              value: "+10", 
              icon: "🏔️",
              description: "Aventures uniques"
            },
            { 
              label: "km parcourus", 
              value: "100+", 
              icon: "📍",
              description: "De paysages en paysages"
            },
            { 
              label: "Altitude max", 
              value: "2500m", 
              icon: "⛰️",
              description: "Au sommet des cimes"
            }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              // Style de carte des statistiques moderne (verre dépoli)
              className="relative p-6 rounded-2xl bg-primary/70 backdrop-blur-sm border border-accent/20 hover:border-accent/40 transition-all duration-300 group shadow-lg"
              whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(16, 185, 129, 0.2)" }} // Ombre accentuée au survol
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-4xl mb-4 inline-block p-3 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5">
                  {stat.icon}
                </div>
                <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/70 mb-2">
                  {stat.value}
                </p>
                <p className="text-beige font-medium text-lg">{stat.label}</p>
                <p className="text-beige/60 text-sm mt-2">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll down indicator */}
      <motion.div 
        className="mt-20 group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: [0.6, 1, 0.6],
          y: [0, 10, 0]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <p className="text-beige/60 text-sm flex items-center justify-center gap-2">
          <span className="group-hover:text-accent transition-colors duration-300">Défiler pour explorer</span>
          <span className="inline-block group-hover:translate-y-1 transition-transform duration-300">↓</span>
        </p>
      </motion.div>
    </motion.main>
  );
}

export default Home;