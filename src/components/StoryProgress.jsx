import { motion, useScroll, useSpring } from 'framer-motion';
import { chapterNav } from '../config/story.js';
import { useActiveSection } from '../hooks/useStoryProgress.js';

/**
 * Story progress: a thin bar across the top (all screens) and a chapter
 * rail on the right (desktop). Active chapter comes from IntersectionObserver.
 */
export default function StoryProgress({ layoutKey }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
  const active = useActiveSection(
    chapterNav.flatMap((c) => [c.target, ...(c.also || [])]),
    [layoutKey]
  );

  return (
    <>
      <motion.div className="progress-bar" style={{ scaleX }} aria-hidden="true" />
      <nav className="chapter-rail" aria-label="Story chapters">
        <ol>
          {chapterNav.map((c) => {
            const on = active === c.target || (c.also || []).includes(active);
            return (
              <li key={c.id}>
                <a href={`#${c.target}`} className={on ? 'is-on' : ''} aria-current={on ? 'step' : undefined}>
                  <span className="chapter-rail__label">{c.label}</span>
                  <span className="chapter-rail__dot">{String(c.id).padStart(2, '0')}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
