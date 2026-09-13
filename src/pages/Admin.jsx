import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UploadCloud, X, LogOut, Edit, Trash2, KeyRound, Loader2, Mail, Lock, Plus, Image as ImageIcon } from 'lucide-react';
import { supabase } from "../lib/supabaseClient";

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

const ADMIN_INPUT_CLASS = "w-full p-3 rounded-xl bg-primary/70 text-beige border border-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/80 transition-all placeholder-beige/50";

export default function Admin() {
  const navigate = useNavigate();
  const [hikes, setHikes] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Auth state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Form & Multi-Image state
  const [editingId, setEditingId] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [galleryFiles, setGalleryFiles] = useState([]); // Fichiers locaux choisis (File[])
  const [existingGalleryUrls, setExistingGalleryUrls] = useState([]); // URLs d'images existantes (string[])
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");
  
  const coverInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  // 1. Gérer la session d'authentification Supabase
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // 2. Charger les randonnées depuis Supabase
  const loadHikes = async () => {
    try {
      const { data, error } = await supabase
        .from('hikes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHikes(data || []);
    } catch (err) {
      console.error("Erreur chargement des hikes:", err.message);
    }
  };

  useEffect(() => {
    if (session) {
      loadHikes();
    }
  }, [session]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      setSession(data.session);
      setEmail("");
      setPassword("");
    } catch (err) {
      setLoginError(err.message || "Identifiants incorrects.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Gestion du choix de la couverture
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  // Gestion du choix de multiples images de galerie
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setGalleryFiles(prev => [...prev, ...files]);
    }
  };

  const removeNewGalleryFile = (index) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingGalleryUrl = (urlToRemove) => {
    setExistingGalleryUrls(prev => prev.filter(url => url !== urlToRemove));
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
    setCoverFile(null);
    setCoverPreview("");
    setGalleryFiles([]);
    setExistingGalleryUrls([]);
    setActionError("");
    if (coverInputRef.current) coverInputRef.current.value = "";
    if (galleryInputRef.current) galleryInputRef.current.value = "";
  };

  // Upload d'image vers le bucket Supabase Storage "hike-images"
  const uploadImageToStorage = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('hike-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from('hike-images')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  // Ajouter ou Modifier une randonnée dans Supabase
  const handleAddHike = async (e) => {
    e.preventDefault();
    setActionError("");
    setIsSubmitting(true);

    try {
      let finalCoverUrl = formData.cover;

      // 1. Upload de la couverture si un nouveau fichier est sélectionné
      if (coverFile) {
        finalCoverUrl = await uploadImageToStorage(coverFile);
      }

      if (!finalCoverUrl) {
        alert("Veuillez sélectionner une image de couverture.");
        setIsSubmitting(false);
        return;
      }

      // 2. Upload des nouvelles images de la galerie
      const newUploadedGalleryUrls = [];
      for (const file of galleryFiles) {
        const url = await uploadImageToStorage(file);
        newUploadedGalleryUrls.push(url);
      }

      // 3. Fusionner les images existantes + les nouvelles images uploadées
      let finalImagesList = [...existingGalleryUrls, ...newUploadedGalleryUrls];

      // S'assurer que l'image de couverture est présente au début de la galerie
      if (finalImagesList.length === 0 || !finalImagesList.includes(finalCoverUrl)) {
        finalImagesList = [finalCoverUrl, ...finalImagesList];
      }

      const hikePayload = {
        title: formData.title,
        location: formData.location,
        difficulty: formData.difficulty,
        date: formData.date,
        distance: formData.distance,
        duration: formData.duration,
        altitude: formData.altitude,
        cover: finalCoverUrl,
        images: finalImagesList,
        description: formData.description,
        review: formData.review,
        advice: formData.advice
      };

      if (editingId) {
        const { error } = await supabase
          .from('hikes')
          .update(hikePayload)
          .eq('id', editingId);

        if (error) throw error;
        alert("✅ Randonnée modifiée avec succès !");
      } else {
        const { error } = await supabase
          .from('hikes')
          .insert([hikePayload]);

        if (error) throw error;
        alert("✅ Randonnée ajoutée avec succès !");
      }

      resetForm();
      await loadHikes();
    } catch (err) {
      console.error("Erreur enregistrement hike:", err);
      setActionError(err.message || "Erreur lors de l'enregistrement.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditHike = (hike) => {
    setFormData(hike);
    setEditingId(hike.id);
    setCoverFile(null);
    setCoverPreview(hike.cover || "");
    setGalleryFiles([]);
    setExistingGalleryUrls(hike.images && Array.isArray(hike.images) ? hike.images : (hike.cover ? [hike.cover] : []));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteHike = async (id) => {
    if (window.confirm("⚠️ Êtes-vous sûr de vouloir supprimer cette randonnée ?")) {
      try {
        const { error } = await supabase
          .from('hikes')
          .delete()
          .eq('id', id);

        if (error) throw error;

        alert("✅ Randonnée supprimée !");
        await loadHikes();
      } catch (err) {
        console.error("Erreur suppression:", err);
        alert("Erreur lors de la suppression: " + err.message);
      }
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-accent animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <motion.main className="pt-24 px-6 bg-primary min-h-screen flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <motion.div className="max-w-md w-full bg-primary/70 p-10 rounded-3xl border border-accent/20 shadow-2xl backdrop-blur-sm" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl font-extrabold text-accent mb-6 flex items-center justify-center gap-3">
            <KeyRound className="w-8 h-8" /> Espace Admin
          </h2>

          {loginError && (
            <div className="mb-4 p-3 bg-red-900/30 border border-red-500 text-red-400 rounded-xl text-sm text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-beige mb-2 font-semibold text-sm flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" /> Email Admin
              </label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="admin@exemple.com" 
                className={ADMIN_INPUT_CLASS} 
                required 
              />
            </div>
            <div>
              <label className="block text-beige mb-2 font-semibold text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-accent" /> Mot de passe
              </label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••" 
                className={ADMIN_INPUT_CLASS} 
                required 
              />
            </div>
            <motion.button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full px-6 py-3 bg-accent rounded-xl text-primary font-bold shadow-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2" 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }}
            >
              {isLoggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : "Se connecter"}
            </motion.button>
          </form>
        </motion.div>
      </motion.main>
    );
  }

  return (
    <motion.main className="pt-24 px-6 md:px-12 bg-primary min-h-screen pb-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
      <div className="max-w-6xl mx-auto">
        
        {/* En-tête et Déconnexion */}
        <motion.div className="flex justify-between items-center mb-12 border-b border-accent/10 pb-4" initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
          <div>
            <h1 className="text-4xl font-extrabold text-accent mb-1">🌄 Gestion des Randonnées</h1>
            <p className="text-beige/70">Connecté en tant que <span className="text-accent font-semibold">{session.user.email}</span>. {hikes.length} circuits actifs.</p>
          </div>
          <motion.button 
            onClick={handleLogout} 
            className="px-4 py-2 bg-red-600/90 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 font-semibold" 
            whileHover={{ scale: 1.05 }}
          >
            <LogOut className="w-5 h-5" /> Déconnexion
          </motion.button>
        </motion.div>

        {actionError && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-500 text-red-400 rounded-xl text-center">
            {actionError}
          </div>
        )}

        {/* Formulaire Ajouter/Modifier */}
        <motion.div className="bg-primary/50 p-8 rounded-3xl border border-accent/30 mb-16 shadow-2xl backdrop-blur-sm" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h2 className="text-3xl font-bold text-beige mb-8 border-b border-beige/10 pb-4">
            {editingId ? "✍️ Modifier la randonnée" : "✨ Ajouter une nouvelle randonnée"}
          </h2>
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

            {/* Téléchargement de la Couverture Principale */}
            <div className="md:col-span-1 space-y-2">
              <label className="block text-beige font-semibold flex items-center justify-between">
                <span>Image de couverture</span>
                <span className="text-xs text-accent font-normal">Principale</span>
              </label>
              <div 
                className="w-full aspect-video bg-primary/70 rounded-xl border-2 border-dashed border-accent/40 flex items-center justify-center text-center relative cursor-pointer hover:border-accent/80 transition-colors overflow-hidden"
                onClick={() => coverInputRef.current.click()}
              >
                <input type="file" accept="image/*" onChange={handleCoverChange} ref={coverInputRef} className="hidden" />
                {!coverPreview && !formData.cover && (
                  <div className="text-beige/60 p-4">
                    <UploadCloud className="w-8 h-8 mx-auto mb-2 text-accent/80" />
                    <p className="font-semibold text-sm">Image principale</p>
                    <p className="text-xs">PNG, JPG, WEBP</p>
                  </div>
                )}
                {(coverPreview || formData.cover) && (
                  <>
                    <img src={coverPreview || formData.cover} alt="Couverture" className="w-full h-full object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                      <p className="text-white font-bold text-sm flex items-center gap-2"><UploadCloud className="w-5 h-5" /> Changer</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* GALERIE PHOTOS MULTIPLES */}
            <div className="md:col-span-3 space-y-3 mt-2 border-t border-accent/10 pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-beige flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-accent" /> Galerie de Photos ({existingGalleryUrls.length + galleryFiles.length})
                  </h3>
                  <p className="text-sm text-beige/60">Ajoutez plusieurs images pour enrichir le carrousel de la randonnée.</p>
                </div>
                <button
                  type="button"
                  onClick={() => galleryInputRef.current.click()}
                  className="px-4 py-2 bg-accent/20 hover:bg-accent/30 text-accent border border-accent/40 rounded-xl transition-colors font-semibold flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" /> Ajouter des photos
                </button>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleGalleryChange}
                  ref={galleryInputRef}
                  className="hidden"
                />
              </div>

              {/* Grille des miniatures d'images */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 pt-2">
                {/* Images existantes (mode édition) */}
                {existingGalleryUrls.map((url, idx) => (
                  <div key={`existing-${idx}`} className="relative aspect-square rounded-xl overflow-hidden group border border-accent/30 bg-primary/70">
                    <img src={url} alt={`Galerie ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeExistingGalleryUrl(url)}
                      className="absolute top-1 right-1 p-1 bg-red-600/90 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity"
                      title="Supprimer cette photo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <span className="absolute bottom-1 left-1 text-[10px] bg-black/60 text-beige px-1.5 py-0.5 rounded font-mono">
                      En ligne
                    </span>
                  </div>
                ))}

                {/* Nouvelles images locales sélectionnées */}
                {galleryFiles.map((file, idx) => (
                  <div key={`new-${idx}`} className="relative aspect-square rounded-xl overflow-hidden group border border-green-500/40 bg-primary/70">
                    <img src={URL.createObjectURL(file)} alt={`Nouveau ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeNewGalleryFile(idx)}
                      className="absolute top-1 right-1 p-1 bg-red-600/90 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity"
                      title="Annuler cette photo"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <span className="absolute bottom-1 left-1 text-[10px] bg-green-700/80 text-white px-1.5 py-0.5 rounded font-mono">
                      Nouveau
                    </span>
                  </div>
                ))}

                {/* Bouton rapide d'ajout */}
                <div
                  onClick={() => galleryInputRef.current.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-accent/30 hover:border-accent flex flex-col items-center justify-center text-center p-2 cursor-pointer transition-colors text-beige/60 hover:text-accent bg-primary/40"
                >
                  <Plus className="w-6 h-6 mb-1" />
                  <span className="text-xs font-semibold">Ajouter</span>
                </div>
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
                disabled={isSubmitting}
                className="w-full px-6 py-4 bg-accent rounded-xl text-primary font-bold text-lg shadow-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2" 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Upload des images ({galleryFiles.length + (coverFile ? 1 : 0)})...</span>
                  </div>
                ) : (
                  <>
                    {editingId ? <Edit className="w-5 h-5" /> : <UploadCloud className="w-5 h-5" />} 
                    {editingId ? "ENREGISTRER LES MODIFICATIONS" : "AJOUTER LA RANDONNÉE"}
                  </>
                )}
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
                        Photos: <span className="font-semibold text-accent">{hike.images?.length || 1}</span> | 
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
}