import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, CircleAlert } from 'lucide-react';
import { InteriorBackdrop } from '../assets/illustrations/backdrops.jsx';
import { storyScenes } from '../config/story.js';
import { useSceneWindow } from '../hooks/useStoryProgress.js';
import Scene01 from '../scenes/Scene01.jsx';
import Scene02 from '../scenes/Scene02.jsx';
import Scene03 from '../scenes/Scene03.jsx';
import Scene04 from '../scenes/Scene04.jsx';
import Scene05 from '../scenes/Scene05.jsx';
import Scene06 from '../scenes/Scene06.jsx';

const SCENES = [Scene01, Scene02, Scene03, Scene04, Scene05, Scene06];
const COUNT = SCENES.length;

/* ------------------------------------------------------------------ */
/* Narration                                                           */
/* ------------------------------------------------------------------ */
function Points({ points, p, scripted }) {
  return (
    <ul className="story-points">
      {points.map((pt, i) => (
        <Point key={pt} text={pt} p={p} at={0.08 + i * 0.16} scripted={scripted} />
      ))}
    </ul>
  );
}

function Point({ text, p, at, scripted }) {
  const op = useTransform(p, [at, at + 0.08], scripted ? [0.25, 1] : [1, 1]);
  const x = useTransform(p, [at, at + 0.08], scripted ? [-10, 0] : [0, 0]);
  return (
    <motion.li style={{ opacity: op, x }}>
      <CircleAlert size={18} aria-hidden="true" />
      {text}
    </motion.li>
  );
}

export function NarrationContent({ scene, p, scripted = true, headingLevel = 2 }) {
  const H = `h${headingLevel}`;
  return (
    <>
      <span className="kicker">
        <b>{String(scene.id).padStart(2, '0')}</b> {scene.label}
      </span>
      <H className="story-title">{scene.title}</H>
      <p className="story-body">{scene.body}</p>
      {scene.points && <Points points={scene.points} p={p} scripted={scripted} />}
    </>
  );
}

function NarrationBlock({ g, index, scene }) {
  const { p } = useSceneWindow(g, index, COUNT);
  // Text swaps without overlap: old copy leaves before the new copy arrives.
  const s = index / COUNT;
  const e = (index + 1) / COUNT;
  const input = index === 0 ? [e - 0.022, e - 0.002] : index === COUNT - 1 ? [s + 0.002, s + 0.022] : [s + 0.002, s + 0.022, e - 0.022, e - 0.002];
  const output = index === 0 ? [1, 0] : index === COUNT - 1 ? [0, 1] : [0, 1, 1, 0];
  const opacity = useTransform(g, input, output);
  const y = useTransform(opacity, [0, 1], [24, 0]);
  const visibility = useTransform(opacity, (v) => (v < 0.02 ? 'hidden' : 'visible'));
  return (
    <motion.div className="narration-block" style={{ opacity, y, visibility }}>
      <NarrationContent scene={scene} p={p} headingLevel={index === 0 ? 1 : 2} />
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Stage layers                                                        */
/* ------------------------------------------------------------------ */
function StageLayer({ g, index, Component }) {
  const { p, opacity } = useSceneWindow(g, index, COUNT);
  const visibility = useTransform(opacity, (v) => (v < 0.01 ? 'hidden' : 'visible'));
  return (
    <motion.div className="stage-layer" style={{ opacity, visibility }}>
      <Component p={p} />
    </motion.div>
  );
}

function StageBackdrop({ g }) {
  const s = 1 / COUNT;
  const opacity = useTransform(g, [s - 0.03, s + 0.004], [0, 1]);
  const x = useTransform(g, [s, 1], [0, -130]);
  const scale = useTransform(g, [s - 0.03, s + 0.03], [1.12, 1]);
  const tint = useTransform(g, [s, 2 * s, 3 * s, 4 * s, 5 * s, 1], [0.2, 0.2, 0.08, 0.04, 0.02, 0]);
  const glow = useTransform(g, [s, 2 * s, 3 * s, 5 * s], [0.35, 0.35, 0.7, 1]);
  return (
    <motion.div className="stage-layer stage-backdrop" style={{ opacity, scale }} aria-hidden="true">
      <svg viewBox="0 0 1200 760" preserveAspectRatio="xMidYMid slice">
        <motion.g style={{ x }}>
          <InteriorBackdrop glowStyle={{ opacity: glow }} />
        </motion.g>
        <motion.rect x="0" y="0" width="1200" height="760" fill="#16231D" style={{ opacity: tint }} />
      </svg>
    </motion.div>
  );
}

function ScrollHint({ g }) {
  const opacity = useTransform(g, [0, 0.03], [1, 0]);
  return (
    <motion.a href="#scene-2" className="scroll-hint" style={{ opacity }}>
      Scroll to follow Rahul’s story <ChevronDown size={18} aria-hidden="true" />
    </motion.a>
  );
}

function ChapterCounter({ g }) {
  const width = useTransform(g, [0, 1], ['0%', '100%']);
  return (
    <div className="chapter-track" aria-hidden="true">
      <motion.span style={{ width }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* DESKTOP: sticky cinematic stage                                     */
/* ------------------------------------------------------------------ */
export function StoryDesktop() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const g = useSpring(scrollYProgress, { stiffness: 160, damping: 34, mass: 0.35, restDelta: 0.0001 });

  return (
    <section id="story" ref={ref} className="story story--desktop" aria-label="Rahul's story in six chapters">
      <div className="story__sticky">
        <div className="story__grid container">
          <div className="story__narration" aria-live="off">
            {storyScenes.map((scene, i) => (
              <NarrationBlock key={scene.id} g={g} index={i} scene={scene} />
            ))}
            <ChapterCounter g={g} />
          </div>
          <div className="story__stagewrap">
            <div className="story__stage">
              <StageBackdrop g={g} />
              {SCENES.map((Component, i) => (
                <StageLayer key={i} g={g} index={i} Component={Component} />
              ))}
            </div>
          </div>
        </div>
        <ScrollHint g={g} />
      </div>
      <div className="story__markers">
        {storyScenes.map((s) => (
          <div key={s.id} id={`scene-${s.id}`} className="story__marker" />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* MOBILE / REDUCED MOTION: natural stacked story                      */
/* ------------------------------------------------------------------ */
const MOBILE_RANGE = [0.52, 1, 1, 0.9, 0.7, 1];
const STATIC_P = [0.3, 0.9, 0.9, 0.9, 0.42, 1];

function MobileScene({ scene, index, Component, reduced }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.45'] });
  const scrollP = useTransform(scrollYProgress, [0, 1], [0, MOBILE_RANGE[index]]);
  const staticP = useMotionValue(STATIC_P[index]);
  const p = reduced ? staticP : scrollP;
  const extra = index === 0 ? { camera: false } : {};
  return (
    <section id={`scene-${scene.id}`} ref={ref} className={`mstory__scene mstory__scene--${scene.id}`}>
      <div className="mstory__text container">
        <NarrationContent scene={scene} p={p} scripted={!reduced} headingLevel={index === 0 ? 1 : 2} />
      </div>
      <div className="mstory__canvas">
        <Component p={p} standalone {...extra} />
      </div>
    </section>
  );
}

export function StoryMobile({ reduced = false }) {
  return (
    <div id="story" className={`story story--mobile ${reduced ? 'is-reduced' : ''}`} aria-label="Rahul's story in six chapters">
      {storyScenes.map((scene, i) => (
        <MobileScene key={scene.id} scene={scene} index={i} Component={SCENES[i]} reduced={reduced} />
      ))}
    </div>
  );
}
