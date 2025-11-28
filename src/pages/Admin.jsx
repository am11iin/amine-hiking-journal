import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UploadCloud, X, LogOut, Edit, Trash2, KeyRound } from 'lucide-react'; // Ajout d'icônes spécifiques
import { hikes as defaultHikes } from "../data/hikes";

const initialFormData = {
  title: "",
  location: "",
  difficulty: "Moyen",
  date: new Date().toISOString().split("T")[0],
  distance: "",
  duration: "",
  altitude: "",
  cover: "",
  description: "",
  review: "",
  advice: ""
};

// Nouvelle classe pour styliser uniformément les champs de formulaire
const ADMIN_INPUT_CLASS = "w-full p-3 rounded-xl bg-primary/70 text-beige border border-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/80 transition-all placeholder-beige/50";

export default function Admin() {
  const navigate = useNavigate();
  const [hikes, setHikes] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false); 
  const [password, setPassword] = useState("");
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  const ADMIN_PASSWORD = "admin2025"; // À changer !

  useEffect(() => {
    const savedHikes = localStorage.getItem("hikesData");
    if (savedHikes) {
      setHikes(JSON.parse(savedHikes));
    } else {
      setHikes(defaultHikes);
      localStorage.setItem("hikesData", JSON.stringify(defaultHikes));
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Utilisation d'un temporisateur pour simuler un délai de connexion
    setTimeout(() => { 
        if (password === ADMIN_PASSWORD) {
          setIsPasswordCorrect(true);
          setPassword("");
        } else {
          alert("❌ Mot de passe incorrect !");
          setPassword("");
        }
    }, 500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, cover: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
    if(fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const handleAddHike = (e) => {
    e.preventDefault();
    if (!formData.cover) {
      alert("Veuillez ajouter une image de couverture.");
      return;
    }

    if (editingId) {
      const updatedHikes = hikes.map(h =>
        h.id === editingId ? { ...formData, id: editingId } : h
      );
      setHikes(updatedHikes);
      localStorage.setItem("hikesData", JSON.stringify(updatedHikes));
      alert("✅ Randonnée modifiée avec succès !");
    } else {
      const newHike = {
        ...formData,
        id: Date.now(),
        images: [formData.cover]
      };
      const updatedHikes = [...hikes, newHike];
      setHikes(updatedHikes);
      localStorage.setItem("hikesData", JSON.stringify(updatedHikes));
      alert("✅ Randonnée ajoutée avec succès !");
    }
    resetForm();
  };

  const handleEditHike = (hike) => {
    setFormData(hike);
    setEditingId(hike.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteHike = (id) => {
    if (window.confirm("⚠️ Êtes-vous sûr de vouloir supprimer cette randonnée ?")) {
      const updatedHikes = hikes.filter(h => h.id !== id);
      setHikes(updatedHikes);
      localStorage.setItem("hikesData", JSON.stringify(updatedHikes));
      alert("✅ Randonnée supprimée !");
    }
  };

  // --- ÉCRAN DE CONNEXION (Style amélioré) ---
  if (!isPasswordCorrect) {
    return (
      <motion.main className="pt-24 px-6 bg-primary min-h-screen flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <motion.div className="max-w-md w-full bg-primary/70 p-10 rounded-3xl border border-accent/20 shadow-2xl backdrop-blur-sm" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl font-extrabold text-accent mb-6 flex items-center justify-center gap-3">
            <KeyRound className="w-8 h-8" /> Espace Admin
          </h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-beige mb-2 font-semibold text-lg">Mot de passe</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="************" 
                // Utilisation du style moderne pour l'input
                className={ADMIN_INPUT_CLASS} 
                required 
              />
            </div>
            <motion.button 
              type="submit" 
              // Bouton en accent pour le contraste
              className="w-full px-6 py-3 bg-accent rounded-xl text-primary font-bold shadow-lg hover:bg-accent/90 transition-colors" 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              Se connecter
            </motion.button>
          </form>
        </motion.div>
      </motion.main>
    );
  }

  // --- INTERFACE D'ADMINISTRATION (Style amélioré) ---
  return (
    <motion.main className="pt-24 px-6 md:px-12 bg-primary min-h-screen pb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <div className="max-w-6xl mx-auto">
        
        {/* En-tête et Déconnexion */}
        <motion.div className="flex justify-between items-center mb-12 border-b border-accent/10 pb-4" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <div>
            <h1 className="text-4xl font-extrabold text-accent mb-1">🌄 Gestion des Randonnées</h1>
            <p className="text-beige/70">Ajoutez, modifiez ou supprimez vos aventures. {hikes.length} circuits actifs.</p>
          </div>
          <motion.button 
            onClick={() => { setIsPasswordCorrect(false); navigate("/"); }} 
            className="px-4 py-2 bg-red-600/90 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 font-semibold" 
            whileHover={{ scale: 1.05 }}
          >
            <LogOut className="w-5 h-5" /> Déconnexion
          </motion.button>
        </motion.div>

        {/* Formulaire Ajouter/Modifier */}
        <motion.div className="bg-primary/50 p-8 rounded-3xl border border-accent/30 mb-16 shadow-2xl backdrop-blur-sm" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h2 className="text-3xl font-bold text-beige mb-8 border-b border-beige/10 pb-4">{editingId ? "✍️ Modifier la randonnée" : "✨ Ajouter une nouvelle randonnée"}</h2>
          <form onSubmit={handleAddHike} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Champs de texte et sélecteurs */}
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Titre de la randonnée" className={ADMIN_INPUT_CLASS} required />
              <input name="location" value={formData.location} onChange={handleInputChange} placeholder="Lieu (ex: Aurès, Algérie)" className={ADMIN_INPUT_CLASS} required />
              <select name="difficulty" value={formData.difficulty} onChange={handleInputChange} className={ADMIN_INPUT_CLASS}>
                <option value="Facile">Facile</option>
                <option value="Moyen">Moyen</option>
                <option value="Difficile">Difficile</option>
              </select>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} className={ADMIN_INPUT_CLASS + " appearance-none"} required />
              <input name="distance" value={formData.distance} onChange={handleInputChange} placeholder="Distance (ex: 12 km)" className={ADMIN_INPUT_CLASS} />
              <input name="duration" value={formData.duration} onChange={handleInputChange} placeholder="Durée (ex: 5h)" className={ADMIN_INPUT_CLASS} />
              <input name="altitude" value={formData.altitude} onChange={handleInputChange} placeholder="Altitude (ex: 1800m)" className={ADMIN_INPUT_CLASS} />
            </div>

            {/* Téléchargement d'image */}
            <div className="md:col-span-1 space-y-2">
              <label className="block text-beige font-semibold">Image de couverture</label>
              <div 
                className="w-full aspect-video bg-primary/70 rounded-xl border-2 border-dashed border-accent/40 flex items-center justify-center text-center relative cursor-pointer hover:border-accent/80 transition-colors"
                onClick={() => fileInputRef.current.click()}
              >
                <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
                {!formData.cover && (
                  <div className="text-beige/60 p-4">
                    <UploadCloud className="w-8 h-8 mx-auto mb-2 text-accent/80" />
                    <p className="font-semibold">Cliquer pour choisir une image</p>
                    <p className="text-xs">PNG, JPG, WEBP</p>
                  </div>
                )}
                {formData.cover && (
                  <>
                    <img src={formData.cover} alt="Aperçu" className="w-full h-full object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                      <p className="text-white font-bold text-lg flex items-center gap-2"><UploadCloud className="w-5 h-5" /> Changer</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Textareas */}
            <div className="md:col-span-3 space-y-6 mt-4">
              <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description détaillée de la randonnée (itinéraire, paysages...)" className={ADMIN_INPUT_CLASS + " h-28"} />
              <textarea name="review" value={formData.review} onChange={handleInputChange} placeholder="Votre avis et retour d'expérience personnel" className={ADMIN_INPUT_CLASS + " h-24"} />
              <textarea name="advice" value={formData.advice} onChange={handleInputChange} placeholder="Conseils pratiques et recommandations (équipement, saison...)" className={ADMIN_INPUT_CLASS + " h-24"} />
            </div>

            {/* Boutons d'action */}
            <div className="md:col-span-3 flex items-center gap-4 pt-4">
              <motion.button 
                type="submit" 
                className="w-full px-6 py-4 bg-accent rounded-xl text-primary font-bold text-lg shadow-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2" 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                {editingId ? <Edit className="w-5 h-5" /> : <UploadCloud className="w-5 h-5" />} 
                {editingId ? "ENREGISTRER LES MODIFICATIONS" : "AJOUTER LA RANDONNÉE"}
              </motion.button>
              {editingId && (
                <button 
                  type="button" 
                  onClick={resetForm} 
                  className="w-auto px-4 py-2 text-center text-beige/70 hover:text-red-400 whitespace-nowrap transition-colors"
                >
                  <X className="w-5 h-5 inline-block mr-1" /> Annuler
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Liste des Randonnées */}
        <motion.div className="bg-primary/50 p-8 rounded-3xl border border-accent/30 shadow-2xl backdrop-blur-sm" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <h2 className="text-3xl font-bold text-beige mb-6">Liste des Randonnées ({hikes.length})</h2>
          <div className="space-y-4">
            <AnimatePresence>
              {hikes.map(hike => (
                <motion.div 
                  key={hike.id} 
                  layout 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: "auto" }} 
                  exit={{ opacity: 0, x: -50 }} 
                  transition={{ duration: 0.4 }} 
                  className="flex items-center p-4 bg-primary/70 rounded-xl border border-accent/10 hover:bg-primary/90 transition-colors shadow-md"
                >
                  <img 
                    src={hike.cover} 
                    alt={hike.title} 
                    className="w-24 h-20 object-cover rounded-lg bg-primary flex-shrink-0 mr-4" 
                  />
                  <div className="flex-grow min-w-0">
                    <h3 className="font-bold text-beige truncate">{hike.title}</h3>
                    <p className="text-sm text-beige/70 truncate">{hike.location}</p>
                    <p className="text-xs text-beige/50 mt-1">
                        Difficulté: <span className="font-semibold text-accent">{hike.difficulty}</span> | 
                        Distance: {hike.distance} | 
                        Durée: {hike.duration}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                    <motion.button 
                      onClick={() => handleEditHike(hike)} 
                      className="p-2 bg-blue-600/90 text-white rounded-lg hover:bg-blue-700 transition-colors" 
                      whileHover={{ scale: 1.15 }}
                    >
                      <Edit className="w-4 h-4" />
                    </motion.button>
                    <motion.button 
                      onClick={() => handleDeleteHike(hike.id)} 
                      className="p-2 bg-red-600/90 text-white rounded-lg hover:bg-red-700 transition-colors" 
                      whileHover={{ scale: 1.15 }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </motion.main>
  );
};