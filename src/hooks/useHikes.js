import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useHikes() {
  const [hikes, setHikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHikes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('hikes')
        .select('*')
        .order('date', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setHikes(data || []);
    } catch (err) {
      console.error('Erreur lors du chargement des randonnées Supabase:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHikes();
  }, [fetchHikes]);

  return { hikes, loading, error, refetch: fetchHikes };
}
