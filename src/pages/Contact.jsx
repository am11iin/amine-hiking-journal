import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, XCircle } from 'lucide-react'; // Utilisation d'icônes Lucide pour plus de cohérence

// Classes basées sur vos couleurs personnalisées
const CARD_CLASS = "bg-primary/50 border border-accent/20 backdrop-blur-md rounded-3xl";
const INPUT_CLASS = "w-full p-4 rounded-xl bg-primary/70 text-beige border border-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/80 transition-all placeholder-beige/50";
const SUCCESS_CLASS = "bg-green-700/30 border border-green-500 text-green-400";
const ERROR_CLASS = "bg-red-700/30 border border-red-500 text-red-400";


export default function Contact() {
  const form = useRef();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setError(false);
    
    // Configuration EmailJS - remplacez avec vos vraies clés
    emailjs.init("YOUR_PUBLIC_KEY"); // À remplacer
    
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current)
      .then(() => {
        setSuccess(true);
        form.current.reset();
        setTimeout(() => setSuccess(false), 4000); // 4 secondes
      })
      .catch(() => {
        setError(true);
        setTimeout(() => setError(false), 4000); // 4 secondes
        console.error("Erreur d'envoi. Vérifiez vos clés EmailJS.");
      });
  };

  const socialLinks = [
    // Changement de la couleur au survol vers des couleurs plus modernes et spécifiques
    { name: "Instagram", icon: "📷", url: "https://www.instagram.com/_amx_ne/", color: "hover:text-pink-500" },
    { name: "TikTok", icon: "🎵", url: "https://www.tiktok.com/@_aminnnne", color: "hover:text-gray-200" },
    { name: "WhatsApp", icon: "💬", url: "", color: "hover:text-green-500" },
    { name: "LinkedIn", icon: "💼", url: "https://www.linkedin.com/in/mohamed-amine-sellami-19686b350/", color: "hover:text-blue-400" },
  ];

  return (
    <motion.main
      // Utilisation de bg-primary ou bg-primary/95 pour un fond sombre cohérent
      className="pt-24 px-6 md:px-12 bg-primary min-h-screen text-beige flex flex-col items-center justify-center pb-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Éléments de fond (Gardé pour l'effet de profondeur) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl opacity-50"></div>
      </div>

      <motion.div
        className="w-full max-w-3xl relative z-10"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-accent mb-4">Contactez-moi</h2>
          <p className="text-xl text-beige/80">N'hésitez pas à me laisser un message pour des questions ou collaborations !</p>
        </div>

        {/* Notifications (Utilisation d'AnimatePresence pour une meilleure transition) */}
        <AnimatePresence>
          {success && (
            <motion.div
              className={`mb-8 p-4 rounded-xl text-center font-bold flex items-center justify-center gap-3 ${SUCCESS_CLASS}`}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle className="w-5 h-5" /> Message envoyé avec succès !
            </motion.div>
          )}
          {error && (
            <motion.div
              className={`mb-8 p-4 rounded-xl text-center font-bold flex items-center justify-center gap-3 ${ERROR_CLASS}`}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <XCircle className="w-5 h-5" /> Erreur : Vérifiez votre configuration EmailJS
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form 
          ref={form} 
          onSubmit={sendEmail} 
          // Utilisation de la classe carte moderne
          className={`${CARD_CLASS} p-8 md:p-10 space-y-6 shadow-2xl`}
        >
          {/* Champs de formulaire (animation en cascade) */}
          {[
            { delay: 0.1, label: "Nom complet", type: "text", name: "user_name", placeholder: "Votre nom" },
            { delay: 0.15, label: "Email", type: "email", name: "user_email", placeholder: "votre.email@exemple.com" },
          ].map((field) => (
            <motion.div key={field.name} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: field.delay }}>
              <label className="block text-base font-bold mb-3 text-beige/80">{field.label}</label>
              <input 
                type={field.type} 
                name={field.name} 
                placeholder={field.placeholder} 
                required 
                className={INPUT_CLASS}
              />
            </motion.div>
          ))}

          {/* Textarea */}
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <label className="block text-base font-bold mb-3 text-beige/80">Message</label>
            <textarea 
              name="message" 
              placeholder="Votre message..." 
              required 
              rows={6} // Hauteur augmentée pour plus de confort
              className={INPUT_CLASS + " resize-none"}
            />
          </motion.div>

          {/* Bouton d'envoi */}
          <motion.button 
            type="submit"
            // Bouton en accent pour le contraste maximum
            className="w-full py-4 bg-accent text-primary rounded-xl text-lg font-bold shadow-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Send className="w-5 h-5" /> Envoyer le message
          </motion.button>
        </form>

        {/* Liens Sociaux */}
        <motion.div
          className="mt-16 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-beige">Retrouvez-moi</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                // Style des liens sociaux : épuré sur fond primaire
                className={`flex items-center gap-3 px-5 py-3 rounded-xl ${CARD_CLASS} text-beige hover:bg-accent/10 transition-all duration-300 ${link.color} font-semibold`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {link.icon} {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}