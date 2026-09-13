import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Home, Compass, Camera, Mail, Mountain, Menu, X } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Fermer le menu mobile lors du changement de page
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: "/", label: "Accueil", icon: Home },
    { path: "/hikes", label: "Randonnées", icon: Compass },
    { path: "/portfolio", label: "Portfolio", icon: Camera },
    { path: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <motion.header 
      className="bg-primary/95 text-beige fixed w-full z-50 shadow-xl border-b border-accent/20 backdrop-blur-md"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-accent hover:text-beige transition-colors duration-300 flex items-center gap-2"
        >
          <Mountain className="w-6 h-6 stroke-2 text-accent" /> 
          <span className="text-beige">Amine<span className="text-accent">.</span></span>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex space-x-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link 
                key={link.path}
                to={link.path} 
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 ${
                  isActive 
                    ? "bg-accent text-primary font-bold shadow-md" 
                    : "text-beige hover:text-accent hover:bg-accent/15"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button (375px Friendly) */}
        <motion.button 
          className="md:hidden text-beige p-2.5 rounded-xl hover:bg-accent/20 transition-colors focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="w-6 h-6 text-accent" /> : <Menu className="w-6 h-6 text-beige" />}
        </motion.button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="md:hidden bg-primary/98 border-t border-accent/20 shadow-2xl backdrop-blur-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                const Icon = link.icon;
                return (
                  <Link 
                    key={link.path}
                    to={link.path}
                    className={`flex items-center gap-3.5 w-full px-4 py-3 text-base font-semibold rounded-xl transition-all ${
                      isActive 
                        ? "bg-accent text-primary font-bold shadow-md" 
                        : "text-beige hover:text-accent hover:bg-accent/15"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}