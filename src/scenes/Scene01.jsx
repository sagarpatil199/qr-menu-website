import { useEffect } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { Rahul } from '../assets/illustrations/characters.jsx';
import {
  ExteriorBuilding,
  ExteriorCity,
  ExteriorSky,
  ExteriorTrees,
  OutdoorTable,
  StringLights,
  Street,
} from '../assets/illustrations/backdrops.jsx';
import { Plant } from '../assets/illustrations/props.jsx';
import { sampleRestaurant } from '../config/sampleMenu.js';
import { SceneCanvas } from './SceneCanvas.jsx';

/**
 * SCENE 01 — Every restaurant has a story.
 * On load: sky → building rises → lights switch on.
 * On scroll: Rahul walks to the door, steps in, camera pushes through the door.
 */
export default function Scene01({ p, camera = true }) {
  const reduce = useReducedMotion();
  const lit = useMotionValue(reduce ? 1 : 0);

  useEffect(() => {
    if (reduce) return undefined;
    const c = animate(lit, 1, { delay: 1.1, duration: 1.4, ease: 'easeOut' });
    return () => c.stop();
  }, [lit, reduce]);

  // parallax layers
  const cityX = useTransform(p, [0, 1], [0, -50]);
  const treeX = useTransform(p, [0, 1], [0, -110]);

  // Rahul walks from the left to the door
  const rahulX = useTransform(p, [0.04, 0.5], [290, 700]);
  const rahulScale = useTransform(p, [0.46, 0.6], [0.56, 0.47]);
  const rahulOpacity = useTransform(p, [0.56, 0.64], [1, 0]);
  const swing = useTransform(p, (v) => {
    if (v < 0.04 || v > 0.6) return 0;
    return Math.sin(v * Math.PI * 22) * 14;
  });
  const bubbleOpacity = useTransform(p, [0, 0.08], [1, 0]);

  // camera push through the door
  const camScale = useTransform(p, [0.62, 1], [1, camera ? 3.2 : 1]);
  const camY = useTransform(p, [0.62, 1], ['0%', camera ? '-4%' : '0%']);
  const doorGlow = useTransform(p, [0.6, 0.95], [0, 1]);

  return (
    <motion.div className="scene01-camera" style={{ scale: camScale, y: camY, originX: 0.583, originY: 0.79 }}>
      <SceneCanvas label="Rahul's Indian restaurant at golden hour, with lights switching on as Rahul walks to the entrance.">
        <ExteriorSky />
        <motion.g style={{ x: cityX }}>
          <motion.g initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <ExteriorCity />
          </motion.g>
        </motion.g>
        <motion.g style={{ x: treeX }}>
          <ExteriorTrees />
        </motion.g>
        <Street />
        <motion.g
          initial={reduce ? false : { y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <ExteriorBuilding litStyle={{ opacity: lit }} name={sampleRestaurant.name.toUpperCase()} />
          <StringLights litStyle={{ opacity: lit }} />
          <g transform="translate(590 640)"><Plant scale={0.5} flip /></g>
          <g transform="translate(810 640)"><Plant scale={0.5} /></g>
          <g transform="translate(1075 640)"><OutdoorTable /></g>
        </motion.g>

        {/* warm light spilling from the door as the camera moves in */}
        <motion.ellipse cx="700" cy="590" rx="90" ry="70" fill="#FFE7A8" style={{ opacity: doorGlow }} />

        {/* Rahul */}
        <motion.g style={{ x: rahulX, opacity: rahulOpacity }}>
          <g transform="translate(0 652)">
            <motion.g style={{ scale: rahulScale, originY: 1, originX: 0.5 }}>
              <Rahul pose="rest" expression="smile" swing={swing} />
            </motion.g>
          </g>
          <motion.g style={{ opacity: bubbleOpacity }}>
            <g transform="translate(26 400)">
              <rect x="0" y="0" width="150" height="52" rx="26" fill="#FFFFFF" stroke="#173D32" strokeWidth="2.5" />
              <path d="M28 50 L20 70 L46 51 Z" fill="#FFFFFF" stroke="#173D32" strokeWidth="2.5" strokeLinejoin="round" />
              <rect x="22" y="46" width="30" height="8" fill="#FFFFFF" />
              <text x="75" y="34" textAnchor="middle" fontFamily="Manrope Variable, sans-serif" fontWeight="800" fontSize="22" fill="#173D32">
                Namaste!
              </text>
            </g>
          </motion.g>
        </motion.g>
      </SceneCanvas>
    </motion.div>
  );
}
