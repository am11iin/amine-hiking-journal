import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Compass, Camera, Mountain, MapPin, TrendingUp, Sparkles, ChevronDown } from "lucide-react";

import { VisitorBadge, VisitorCard } from '../components/VisitorCounter';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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
      className="pt-24 bg-primary min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden text-beige"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <motion.div 
          className="absolute top-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-3xl"
          animate={{
            y: [0, 25, 0],
            x: [0, -25, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.div 
        className="text-center max-w-5xl relative z-10 px-4"
        variants={container}
      >
        {/* Badges / Tagline */}
        <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent font-semibold text-sm backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Journal d'Aventures & Randonnées</span>
          </div>
          <VisitorBadge />
        </motion.div>

        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl font-black text-beige mb-6 leading-tight tracking-tight"
          variants={item}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-emerald-400 to-accent/70">
            Explorer la Montagne
          </span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl font-semibold mb-6"
          variants={item}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-beige/90 to-beige/60">
            Vivre, respirer, capturer l'essence des sommets
          </span>
        </motion.p>

        <motion.p 
          className="text-lg text-beige/80 mb-12 leading-relaxed max-w-2xl mx-auto"
          variants={item}
        >
          Découvrez mes expéditions à travers les plus beaux massifs. Chaque itinéraire raconte une histoire, chaque sommet offre un panorama inoubliable et des souvenirs durables.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          variants={item}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link 
              to="/hikes"
              className="inline-flex items-center justify-center gap-3 text-lg px-8 py-4 rounded-xl bg-gradient-to-r from-accent to-emerald-600 hover:from-accent/90 hover:to-emerald-500 transition-all duration-300 shadow-xl shadow-accent/20 text-primary font-bold"
            >
              <Compass className="w-5 h-5" />
              <span>Voir mes randonnées</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link 
              to="/portfolio"
              className="inline-flex items-center justify-center gap-3 text-lg px-8 py-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-accent/40 transition-all duration-300 text-beige font-semibold"
            >
              <Camera className="w-5 h-5 text-accent" />
              <span>Portfolio Galerie</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Modern Statistics Cards */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto w-full"
          variants={item}
        >
          {[
            { 
              label: "Randonnées", 
              value: "+10", 
              icon: Mountain,
              description: "Aventures uniques"
            },
            { 
              label: "km parcourus", 
              value: "100+", 
              icon: MapPin,
              description: "Sentiers explorés"
            },
            { 
              label: "Altitude max", 
              value: "2500m", 
              icon: TrendingUp,
              description: "Au sommet des cimes"
            }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              className="relative p-6 rounded-2xl bg-primary/70 backdrop-blur-md border border-accent/20 hover:border-accent/50 transition-all duration-300 group shadow-xl"
              whileHover={{ y: -6, boxShadow: "0 15px 30px -5px rgba(16, 185, 129, 0.25)" }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (i * 0.1) }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="w-12 h-12 mb-4 mx-auto flex items-center justify-center rounded-xl bg-accent/10 border border-accent/30 text-accent group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-accent via-emerald-400 to-accent/70 mb-2">
                  {stat.value}
                </p>
                <p className="text-beige font-semibold text-lg">{stat.label}</p>
                <p className="text-beige/60 text-sm mt-1">{stat.description}</p>
              </div>
            </motion.div>
          ))}
          <VisitorCard />
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div 
        className="mt-20 group cursor-pointer"
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
        <Link to="/hikes" className="text-beige/60 text-sm flex items-center justify-center gap-2 hover:text-accent transition-colors">
          <span>Défiler pour explorer</span>
          <ChevronDown className="w-4 h-4 text-accent" />
        </Link>
      </motion.div>
    </motion.main>
  );
}

export default Home;