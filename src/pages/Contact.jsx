import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, XCircle, Instagram, Music, MessageCircle, Linkedin, Mail, Loader2 } from 'lucide-react';

const CARD_CLASS = "bg-primary/50 border border-accent/20 backdrop-blur-md rounded-3xl";
const INPUT_CLASS = "w-full p-4 rounded-xl bg-primary/70 text-beige border border-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/80 transition-all placeholder-beige/50";
const SUCCESS_CLASS = "bg-green-700/30 border border-green-500 text-green-400";
const ERROR_CLASS = "bg-red-700/30 border border-red-500 text-red-400";

export default function Contact() {
  const form = useRef();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setError(false);
    setErrorMsg("");
    setIsSending(true);
    
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "LvAfRBv6ZVDKtFUlO";
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_rktp91g";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_x2sifvk";

    emailjs.init(publicKey);
    
    emailjs.sendForm(serviceId, templateId, form.current)
      .then(() => {
        setSuccess(true);
        form.current.reset();
        setTimeout(() => setSuccess(false), 5000);
      })
      .catch((err) => {
        setError(true);
        setErrorMsg(err.text || "Erreur lors de l'envoi du message.");
        setTimeout(() => setError(false), 5000);
        console.error("Erreur d'envoi EmailJS:", err);
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const socialLinks = [
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/_amx_ne/", color: "hover:text-pink-400 hover:border-pink-500/40" },
    { name: "TikTok", icon: Music, url: "https://www.tiktok.com/@_aminnnne", color: "hover:text-gray-200 hover:border-gray-400/40" },
    { name: "WhatsApp", icon: MessageCircle, url: "https://wa.me/", color: "hover:text-green-400 hover:border-green-500/40" },
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/in/mohamed-amine-sellami-19686b350/", color: "hover:text-blue-400 hover:border-blue-500/40" },
  ];

  return (
    <motion.main
      className="pt-24 px-6 md:px-12 bg-primary min-h-screen text-beige flex flex-col items-center justify-center pb-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-semibold text-sm mb-4">
            <Mail className="w-4 h-4" />
            <span>Restons en Contact</span>
          </div>
          <h2 className="text-5xl font-extrabold text-accent mb-4 tracking-tight">Contactez-moi</h2>
          <p className="text-xl text-beige/80 max-w-lg mx-auto">N'hésitez pas à me laisser un message pour des questions ou des collaborations !</p>
        </div>

        <AnimatePresence>
          {success && (
            <motion.div
              className={`mb-8 p-4 rounded-xl text-center font-bold flex items-center justify-center gap-3 ${SUCCESS_CLASS}`}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle className="w-5 h-5" /> Message envoyé avec succès ! Je vous répondrai très vite.
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
              <XCircle className="w-5 h-5" /> {errorMsg || "Erreur lors de l'envoi du message."}
            </motion.div>
          )}
        </AnimatePresence>

        <form 
          ref={form} 
          onSubmit={sendEmail} 
          className={`${CARD_CLASS} p-8 md:p-10 space-y-6 shadow-2xl`}
        >
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

          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <label className="block text-base font-bold mb-3 text-beige/80">Message</label>
            <textarea 
              name="message" 
              placeholder="Votre message..." 
              required 
              rows={6}
              className={INPUT_CLASS + " resize-none"}
            />
          </motion.div>

          <motion.button 
            type="submit"
            disabled={isSending}
            className="w-full py-4 bg-accent text-primary rounded-xl text-lg font-bold shadow-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Envoi en cours...</span>
              </div>
            ) : (
              <>
                <Send className="w-5 h-5" /> Envoyer le message
              </>
            )}
          </motion.button>
        </form>

        <motion.div
          className="mt-16 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-beige">Retrouvez-moi sur les réseaux</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-6 py-3.5 rounded-xl ${CARD_CLASS} text-beige hover:bg-accent/10 transition-all duration-300 ${link.color} font-semibold border border-accent/20`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <link.icon className="w-5 h-5 text-accent" /> {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}