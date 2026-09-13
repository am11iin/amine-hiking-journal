import React from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Instagram, Music, MessageCircle, ArrowUp, Mail, BookOpen, Heart, Activity } from "lucide-react";

import { VisitorBadge } from './VisitorCounter';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
};

export default function Footer() {
  const socialLinks = [
    { name: "Instagram", icon: <Instagram size={20} />, url: "https://www.instagram.com/_amx_ne/" },
    { name: "TikTok", icon: <Music size={20} />, url: "https://www.tiktok.com/@_aminnnnee" },
    { name: "Strava", icon: <Activity size={20} />, url: "https://strava.app.link/TnVssSHoo6b" },
  ];
  
  const resourceLinks = [
    { name: "Blog de Rando", url: "/hikes", icon: <BookOpen size={16} /> },
    { name: "Nos Valeurs", url: "/portfolio", icon: <Heart size={16} /> },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Merci pour votre inscription à la newsletter !");
  };

  return (
    <motion.footer 
      className="bg-primary text-beige border-t border-accent/20 mt-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{ staggerChildren: 0.15 }}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          
          <motion.div 
            className="col-span-2 md:col-span-1 flex flex-col items-start gap-3"
            variants={itemVariants}
          >
            <div>
              <p className="text-2xl font-extrabold text-accent mb-1">Amine Hiking</p>
              <p className="text-sm text-beige/70">L'aventure au quotidien, avec style.</p>
            </div>

            <VisitorBadge />

            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg text-sm hover:bg-green-700 transition-all shadow-lg transform hover:scale-[1.03]"
              title="Contactez-moi directement"
            >
              <MessageCircle size={16} /> 
              Discutons Rando
            </a>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-beige/80 mb-4">Navigation Rapide</h4>
            <div className="space-y-3">
              <Link to="/" className="block text-sm text-beige/60 hover:text-accent transition-all hover:translate-x-1">Accueil</Link>
              <Link to="/hikes" className="block text-sm text-beige/60 hover:text-accent transition-all hover:translate-x-1">Randonnées</Link>
              <Link to="/portfolio" className="block text-sm text-beige/60 hover:text-accent transition-all hover:translate-x-1">Galerie Photos</Link>
              <Link to="/contact" className="block text-sm text-beige/60 hover:text-accent transition-all hover:translate-x-1">Contact Pro</Link>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-beige/80 mb-4">Ressources & Support</h4>
            <div className="space-y-3">
              {resourceLinks.map((link) => (
                <Link key={link.name} to={link.url} className="flex items-center gap-2 text-sm text-beige/60 hover:text-accent transition-all hover:translate-x-1">
                    {link.icon} {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-xs font-bold uppercase tracking-widest text-beige/80 mb-4">Restez Connecté</h4>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <p className="text-sm text-beige/70">Ne manquez aucune nouvelle expédition.</p>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
                <input 
                  type="email" 
                  placeholder="Votre Email Pro" 
                  required
                  className="w-full p-2 pl-10 text-sm bg-primary border border-accent/30 rounded-md text-beige focus:border-accent focus:ring-1 focus:ring-accent placeholder-beige/50"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full p-2 bg-accent text-primary font-semibold text-sm rounded-md hover:bg-accent/80 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Je m'abonne
              </motion.button>
            </form>
            
            <div className="flex items-center gap-4 mt-6"> 
              {socialLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-beige/60 hover:text-accent transition-colors transform hover:scale-110"
                  title={`Suivez-moi sur ${link.name}`}
                >
                  {link.icon}
                </a>
              ))}

              <Link 
                to="/admin" 
                onClick={handleScrollToTop}
                className="text-xs text-beige/50 ml-4 px-3 py-1 border border-beige/30 rounded-full hover:bg-accent hover:text-primary transition-all font-semibold" 
                title="Zone d'administration"
              >
                Admin
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-accent/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
          <p className="text-xs text-beige/50 order-2 md:order-1">
            &copy; {new Date().getFullYear()} Amine Hiking Journal. Tous droits réservés. Développé avec 💙.
          </p>
          
          <motion.button
            onClick={handleScrollToTop}
            className="p-3 bg-accent/20 text-accent rounded-full hover:bg-accent/40 transition-colors shadow-md order-1 md:order-2"
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            title="Retour en haut de page"
            aria-label="Retourner en haut de page"
          >
            <ArrowUp size={20} className="text-accent" />
          </motion.button>
        </div>
      </div>
    </motion.footer>
  );
}