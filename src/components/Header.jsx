import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

// --- Définition des icônes SVG modernes (inchangées) ---
const Icons = {
  Home: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Hike: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17.657 16.657 13.414 12.414a2 2 0 0 0-2.828 0L6.75 16.75l-2.5-2.5v7.5h7.5l-2.5-2.5 4.242-4.243a2 2 0 0 1 2.828 0z"/><path d="M12 2L12 12"/><path d="M17 5L17 12"/></svg>,
  Portfolio: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  Contact: (props) => <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
};


export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  // Utilisation de text-beige pour la couleur par défaut
  const navLinks = [
    { path: "/", label: "Accueil", icon: Icons.Home },
    { path: "/hikes", label: "Randonnées", icon: Icons.Hike },
    { path: "/portfolio", label: "Portfolio", icon: Icons.Portfolio },
    { path: "/contact", label: "Contact", icon: Icons.Contact },
  ];

  const buttonVariants = {
    closed: { rotate: 0 },
    open: { rotate: 90 },
  };

  return (
    <motion.header 
      // 🥇 CLASSES ORIGINALES RESTAURÉES
      className="bg-gradient-to-b from-primary to-primary/80 text-beige fixed w-full z-50 shadow-glow border-b border-accent/20 backdrop-blur-md bg-opacity-95"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo (Icône accent, Texte beige) */}
        <Link 
          to="/" 
          // Utilisation de text-accent pour le logo/icône comme dans l'original
          className="text-2xl font-extrabold tracking-tight text-accent hover:text-beige transition-colors duration-300 flex items-center gap-1.5"
        >
          {/* Icône Montagne en accent */}
          <Icons.Hike className="w-6 h-6 stroke-2" /> 
          <span className="text-beige">Amine</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              // Liens : Texte beige, Survol accent sur fond primary/accent
              className="px-4 py-2 text-sm font-medium text-beige hover:text-accent hover:bg-accent/20 rounded-lg transition-all duration-200"
            >
              <div className="flex items-center gap-2">
                <link.icon className="w-4 h-4" />
                <span>{link.label}</span>
              </div>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button (couleur beige) */}
        <motion.button 
          className="md:hidden text-beige p-2 rounded-full hover:bg-accent/20 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle navigation"
        >
          <motion.div
            variants={buttonVariants}
            animate={isOpen ? "open" : "closed"}
            transition={{ duration: 0.3 }}
          >
            {/* Icône Hamburger/Close */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </motion.div>
        </motion.button>
      </div>

      {/* Mobile Navigation (Fond primary/accent) */}
      <motion.nav
        className="md:hidden bg-primary/95 border-t border-accent/20 shadow-xl"
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
            opacity: isOpen ? 1 : 0, 
            height: isOpen ? "auto" : 0,
            overflow: "hidden" 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="px-4 sm:px-6 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              // Texte beige, Survol accent
              className="flex items-center gap-3 w-full px-3 py-3 text-base font-medium text-beige hover:text-accent hover:bg-accent/20 rounded-lg transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      </motion.nav>
    </motion.header>
  );
}