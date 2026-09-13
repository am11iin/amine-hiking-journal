import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Users, Sparkles } from 'lucide-react';
import { useVisitorCount } from '../hooks/useVisitorCount';

export function VisitorBadge({ className = '' }) {
  const { visitorCount, loading } = useVisitorCount();

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-semibold text-xs sm:text-sm backdrop-blur-md ${className}`}>
      <Eye className="w-4 h-4 text-accent animate-pulse" />
      <span>Visiteurs :</span>
      <span className="font-extrabold text-beige tracking-wider">
        {loading ? '...' : visitorCount.toLocaleString('fr-FR')}
      </span>
    </div>
  );
}

export function VisitorCard() {
  const { visitorCount, loading } = useVisitorCount();

  return (
    <motion.div
      className="relative p-6 rounded-2xl bg-primary/70 backdrop-blur-md border border-accent/20 hover:border-accent/50 transition-all duration-300 group shadow-xl"
      whileHover={{ y: -6, boxShadow: '0 15px 30px -5px rgba(16, 185, 129, 0.25)' }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
      <div className="relative z-10 text-center">
        <div className="w-12 h-12 mb-4 mx-auto flex items-center justify-center rounded-xl bg-accent/10 border border-accent/30 text-accent group-hover:scale-110 transition-transform">
          <Users className="w-6 h-6" />
        </div>
        <p className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-accent via-emerald-400 to-accent/70 mb-2">
          {loading ? '...' : visitorCount.toLocaleString('fr-FR')}
        </p>
        <p className="text-beige font-semibold text-lg">Visiteurs Unique</p>
        <p className="text-beige/60 text-sm mt-1">Explorateurs sur le site</p>
      </div>
    </motion.div>
  );
}
