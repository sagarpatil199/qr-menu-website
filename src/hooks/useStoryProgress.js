import { useEffect, useRef, useState } from 'react';
import { isMotionValue, useMotionValue, useTransform } from 'framer-motion';

/**
 * For scene `index` (0-based) out of `count`, derive from the global story
 * progress `g` (0..1):
 *   p       – local scene progress 0..1 (MotionValue)
 *   opacity – cross-fade visibility (MotionValue)
 * No React state is touched on scroll; everything stays as MotionValues.
 */
export function useSceneWindow(g, index, count) {
  const start = index / count;
  const end = (index + 1) / count;
  const fade = 0.022;
  const p = useTransform(g, [start, end], [0, 1]);

  let input;
  let output;
  if (index === 0) {
    input = [end - fade, end + fade * 0.6];
    output = [1, 0];
  } else if (index === count - 1) {
    input = [start - fade * 0.6, start + fade];
    output = [0, 1];
  } else {
    input = [start - fade * 0.6, start + fade, end - fade, end + fade * 0.6];
    output = [0, 1, 1, 0];
  }
  const opacity = useTransform(g, input, output);
  return { p, opacity };
}

/** Accept either a number or a MotionValue, always return a MotionValue. */
export function useMV(value) {
  const fallback = useMotionValue(isMotionValue(value) ? 0 : value);
  useEffect(() => {
    if (!isMotionValue(value)) fallback.set(value);
  }, [value, fallback]);
  return isMotionValue(value) ? value : fallback;
}

/** Subscribe to a media query (updates only when the match changes). */
export function useMediaQuery(query) {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false);
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

/**
 * Track which of the given element ids is currently in the middle of the
 * viewport, using IntersectionObserver (no scroll listeners).
 */
export function useActiveSection(ids, deps = []) {
  const [active, setActive] = useState(ids[0]);
  const idsKey = ids.join('|');
  const ref = useRef(ids);
  ref.current = ids;
  useEffect(() => {
    const els = ref.current.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-12% 0px -87% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey, ...deps]);
  return active;
}
