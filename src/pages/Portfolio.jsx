import React from 'react';
import { motion } from "framer-motion";
import { Camera, Sparkles, Image as ImageIcon } from "lucide-react";
import Gallery from "../components/Gallery";
import { useHikes } from "../hooks/useHikes";
import { images as defaultImages } from "../config/images";

export default function Portfolio() {
  const { hikes, loading } = useHikes();

  // Extraire et dédoublonner toutes les photos de toutes les randonnées Supabase
  const supabasePhotos = hikes.flatMap(hike => {
    const list = [];
    if (hike.cover) list.push(hike.cover);
    if (hike.images && Array.isArray(hike.images)) {
      list.push(...hike.images);
    }
    return list;
  }).filter((url, index, self) => url && typeof url === 'string' && self.indexOf(url) === index);

  // Si Supabase a des photos, on les utilise, sinon on utilise les images par défaut
  const displayImages = supabasePhotos.length > 0 ? supabasePhotos : defaultImages;

  return (
    <motion.main 
      className="pt-24 px-6 md:px-12 bg-primary min-h-screen text-beige pb-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Éléments de fond */}
      <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-semibold text-sm mb-4">
            <Camera className="w-4 h-4" />
            <span>Galerie Photographique ({displayImages.length} clichés)</span>
          </div>
          <h2 className="text-5xl font-extrabold text-accent mb-3 tracking-tight">Portfolio Global</h2>
          <p className="text-xl text-beige/80 max-w-2xl mx-auto">
            Découvrez tous les moments magiques capturés lors de mes aventures en montagne
          </p>
        </motion.div>

        {loading ? (
          <div className="py-20 text-center">
            <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-beige/70 font-semibold">Chargement du portfolio...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Gallery images={displayImages} />
          </motion.div>
        )}
      </div>
    </motion.main>
  );
}