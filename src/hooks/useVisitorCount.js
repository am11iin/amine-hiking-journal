import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useVisitorCount() {
  const [visitorCount, setVisitorCount] = useState(null);
  const [displayCount, setDisplayCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function incrementAndFetch() {
      try {
        // Try RPC first for atomic increment on Supabase
        const { data, error } = await supabase.rpc('increment_visits');

        if (!error && typeof data === 'number') {
          if (isMounted) {
            setVisitorCount(data);
            setLoading(false);
          }
          return;
        }

        // Fallback: direct table select if RPC isn't deployed yet
        const { data: tableData, error: tableError } = await supabase
          .from('visits')
          .select('count')
          .eq('id', 1)
          .single();

        if (!tableError && tableData?.count) {
          if (isMounted) {
            setVisitorCount(tableData.count);
            setLoading(false);
          }
          return;
        }

        // Smart LocalStorage Fallback (if Supabase key is not yet configured or SQL not run)
        const storedCount = parseInt(localStorage.getItem('amine_visitor_count') || '105', 10);
        const newCount = storedCount + 1;
        localStorage.setItem('amine_visitor_count', newCount.toString());

        if (isMounted) {
          setVisitorCount(newCount);
          setLoading(false);
        }
      } catch (err) {
        console.warn('Visitor counter notice:', err?.message || err);
        const storedCount = parseInt(localStorage.getItem('amine_visitor_count') || '105', 10);
        const newCount = storedCount + 1;
        localStorage.setItem('amine_visitor_count', newCount.toString());

        if (isMounted) {
          setVisitorCount(newCount);
          setLoading(false);
        }
      }
    }

    incrementAndFetch();

    return () => {
      isMounted = false;
    };
  }, []);

  // Smooth Count-Up Animation
  useEffect(() => {
    if (visitorCount === null) return;

    let start = 0;
    const end = visitorCount;
    const duration = 1500; // 1.5 seconds
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Easing out quad
      const easeOut = 1 - (1 - progress) * (1 - progress);
      const current = Math.floor(easeOut * (end - start) + start);

      setDisplayCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplayCount(end);
      }
    }

    requestAnimationFrame(step);
  }, [visitorCount]);

  return { visitorCount: displayCount, loading, rawCount: visitorCount };
}
