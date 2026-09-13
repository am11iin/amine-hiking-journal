-- ==========================================
-- 1. CREATION DE LA TABLE HIKES
-- ==========================================
CREATE TABLE IF NOT EXISTS public.hikes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    location TEXT NOT NULL,
    difficulty TEXT NOT NULL DEFAULT 'Moyen',
    date TEXT NOT NULL,
    distance TEXT,
    duration TEXT,
    altitude TEXT,
    cover TEXT NOT NULL,
    images TEXT[] DEFAULT ARRAY[]::TEXT[],
    description TEXT,
    review TEXT,
    advice TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 2. ACTIVATION DE RLS (ROW LEVEL SECURITY)
-- ==========================================
ALTER TABLE public.hikes ENABLE ROW LEVEL SECURITY;

-- Policy 1 : Lecture publique pour tout le monde (select)
CREATE POLICY "Accès public en lecture aux randonnées" 
ON public.hikes 
FOR SELECT 
USING (true);

-- Policy 2 : Insertion réservée aux utilisateurs authentifiés
CREATE POLICY "Insertion restreinte aux utilisateurs authentifiés" 
ON public.hikes 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Policy 3 : Modification réservée aux utilisateurs authentifiés
CREATE POLICY "Modification restreinte aux utilisateurs authentifiés" 
ON public.hikes 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Policy 4 : Suppression réservée aux utilisateurs authentifiés
CREATE POLICY "Suppression restreinte aux utilisateurs authentifiés" 
ON public.hikes 
FOR DELETE 
TO authenticated 
USING (true);


-- ==========================================
-- 3. CREATION DU BUCKET STORAGE "hike-images"
-- ==========================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('hike-images', 'hike-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policies pour le bucket "hike-images"
CREATE POLICY "Lecture publique des images de randonnées" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'hike-images');

CREATE POLICY "Upload d'images réservé aux utilisateurs authentifiés" 
ON storage.objects 
FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'hike-images');

CREATE POLICY "Modification d'images réservée aux utilisateurs authentifiés" 
ON storage.objects 
FOR UPDATE 
TO authenticated 
USING (bucket_id = 'hike-images');

CREATE POLICY "Suppression d'images réservée aux utilisateurs authentifiés" 
ON storage.objects 
FOR DELETE 
TO authenticated 
USING (bucket_id = 'hike-images');


-- ==========================================
-- 4. DONNEES INITIALES (SEED DATA)
-- ==========================================
INSERT INTO public.hikes (title, location, difficulty, date, distance, duration, altitude, cover, images, description, review, advice)
VALUES 
(
    'Camping Lac Noir – Akfadou',
    'Lac Noir, Akfadou, Béjaïa',
    'Facile',
    '2023-11-01',
    '10 km',
    '2 h',
    '1100 m',
    '/hike1.webp',
    ARRAY['/hike1.webp', '/hike2.webp', '/hike3.webp', '/hike4.webp', '/hike5.webp', '/hike6.webp', '/hike7.webp'],
    'Le Lac Noir à Akfadou, à 1 100 m d’altitude, est un endroit paisible et parfait pour un camping de 2 jours. Le site est entouré de pins et de montagnes, idéal pour se détendre et randonner.',
    'Endroit calme et ressourçant, idéal pour un weekend nature.',
    'Tente + piquets + tapis de sol
Sac de couchage adapté à la saison
Matelas gonflable ou mousse
Lampe frontale + piles
Vêtements chauds
Chaussures de randonnée
Veste coupe-vent
Maillot de bain
Couteau multifonctions'
),
(
    'Télésiège de Tikjda',
    'Djurdjura, Bouira',
    'Moyen',
    '2024-03-01',
    '12 km',
    '2 h',
    '1800 m',
    '/hike14.webp',
    ARRAY['/hike8.webp', '/hike9.webp', '/hike10.webp'],
    'La randonnée commence depuis la station du télésiège de Tikjda. Vous montez en télésiège pour profiter d’une vue panoramique sur les montagnes du Djurdjura. L’itinéraire traverse des forêts de cèdres et des pâturages alpins avec des panoramas magnifiques.',
    'Le télésiège rend la randonnée accessible même aux débutants. Les sentiers sont bien entretenus et les paysages superbes.',
    'Chaussures de randonnée, vêtements chauds, vérifier les horaires du télésiège, rester sur les sentiers balisés.'
),
(
    'Montagne de l''Aurès',
    'Aurès, Algérie',
    'Moyen',
    '2025-07-12',
    '12 km',
    '5 h',
    '1800 m',
    '/amine.webp',
    ARRAY['/amine.webp', '/amine1.webp'],
    'Randonnée incroyable avec vues panoramiques sur les montagnes de l''Aurès.',
    'Superbe expérience, prévoir de l''eau et des snacks.',
    'Porter des chaussures adaptées, éviter après pluie.'
),
(
    'Chaîne de l’Atlas',
    'Atlas, Algérie',
    'Difficile',
    '2025-06-20',
    '15 km',
    '7 h',
    '2500 m',
    '/amine1.webp',
    ARRAY['/amine1.webp', '/amine.webp'],
    'Ascension technique avec paysages grandioses.',
    'Exigeant mais très gratifiant.',
    'Apporter bâtons de randonnée et vêtements chauds.'
);
