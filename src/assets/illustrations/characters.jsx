/**
 * Reusable, layered SVG character system.
 *
 * Every character is built from the same parts (Head, Arm, Legs, Torso),
 * so Rahul looks identical in every scene — only pose and expression change.
 *
 * Coordinate system: each character's origin (0,0) is the point between
 * the feet. A standing adult is ~330 units tall.
 */
import { useEffect, useRef } from 'react';
import { isMotionValue, motion, useTransform } from 'framer-motion';
import { useMV } from '../../hooks/useStoryProgress.js';

export const palette = {
  green: '#173D32',
  greenMid: '#24584A',
  lime: '#C5F36A',
  cream: '#FFF9EF',
  orange: '#F28C45',
  orangeDeep: '#D9692A',
  ink: '#202820',
  charcoal: '#2E3530',
};

const SKIN = {
  rahul: { base: '#B97A4F', shade: '#9E6440', blush: '#C9845A' },
  priya: { base: '#C78C62', shade: '#AC7350', blush: '#D69472' },
  arjun: { base: '#9A6240', shade: '#7F4F33', blush: '#A86C48' },
  ramesh: { base: '#A86E48', shade: '#8E5A39', blush: '#B67A52' },
};

/* ------------------------------------------------------------------ */
/* Faces                                                               */
/* ------------------------------------------------------------------ */

function Eyes({ expression }) {
  const ink = '#1E1714';
  if (expression === 'smile') {
    return (
      <g stroke={ink} strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M-16 -36 Q-11 -42 -6 -36" />
        <path d="M6 -36 Q11 -42 16 -36" />
      </g>
    );
  }
  return (
    <g fill={ink}>
      <ellipse cx="-11" cy="-36" rx="3.2" ry={expression === 'curious' ? 4 : 3.6} />
      <ellipse cx="11" cy="-36" rx="3.2" ry={expression === 'curious' ? 4 : 3.6} />
      <circle cx="-10" cy="-37.4" r="1" fill="#fff" />
      <circle cx="12" cy="-37.4" r="1" fill="#fff" />
    </g>
  );
}

function Brows({ expression, color }) {
  const common = { stroke: color, strokeWidth: 3.6, strokeLinecap: 'round', fill: 'none' };
  if (expression === 'frustrated') {
    return (
      <g {...common}>
        <path d="M-18 -48 L-6 -44" />
        <path d="M18 -48 L6 -44" />
      </g>
    );
  }
  if (expression === 'curious') {
    return (
      <g {...common}>
        <path d="M-17 -46 Q-11 -49 -5 -46" />
        <path d="M5 -50 Q11 -55 17 -50" />
      </g>
    );
  }
  return (
    <g {...common}>
      <path d="M-17 -46 Q-11 -50 -5 -47" />
      <path d="M5 -47 Q11 -50 17 -46" />
    </g>
  );
}

function Mouth({ expression }) {
  if (expression === 'smile') {
    return (
      <g>
        <path d="M-11 -20 Q0 -5 11 -20 Z" fill="#6B2B22" />
        <path d="M-9 -19.5 L9 -19.5 L8 -16.5 L-8 -16.5 Z" fill="#fff" />
      </g>
    );
  }
  if (expression === 'frustrated') {
    return <path d="M-8 -14 Q0 -21 8 -14" stroke="#5A2A20" strokeWidth="3" fill="none" strokeLinecap="round" />;
  }
  if (expression === 'curious') {
    return <ellipse cx="2" cy="-17" rx="4" ry="5" fill="#5A2A20" />;
  }
  return <path d="M-9 -19 Q0 -12 9 -19" stroke="#5A2A20" strokeWidth="3" fill="none" strokeLinecap="round" />;
}

/**
 * Head. Origin = base of neck. Face centre is at (0, -34).
 * hair: 'rahul' | 'priya' | 'arjun' | 'ramesh'
 */
export function Head({ skin, hair, hairColor = '#22180F', expression = 'neutral', beard, glasses, bindi, earrings }) {
  return (
    <g>
      {/* hair behind the head (long hair) */}
      {hair === 'priya' && (
        <g fill={hairColor}>
          <path d="M-33 -40 C-40 -10 -36 18 -26 34 L26 34 C36 18 40 -10 33 -40 Z" />
        </g>
      )}
      {/* neck */}
      <rect x="-10" y="-12" width="20" height="18" rx="6" fill={skin.shade} />
      {/* ears */}
      <ellipse cx="-29" cy="-33" rx="6" ry="8" fill={skin.shade} />
      <ellipse cx="29" cy="-33" rx="6" ry="8" fill={skin.shade} />
      {earrings && (
        <g fill="#E3B341">
          <circle cx="-29" cy="-22" r="3.4" />
          <circle cx="29" cy="-22" r="3.4" />
        </g>
      )}
      {/* face */}
      <ellipse cx="0" cy="-34" rx="28" ry="33" fill={skin.base} />
      {/* cheeks */}
      <ellipse cx="-16" cy="-24" rx="6" ry="4" fill={skin.blush} opacity="0.55" />
      <ellipse cx="16" cy="-24" rx="6" ry="4" fill={skin.blush} opacity="0.55" />

      {/* beard (Rahul's signature trimmed beard) */}
      {beard && (
        <g fill={hairColor}>
          <path d="M-28 -36 C-28 -8 -14 2 0 2 C14 2 28 -8 28 -36 L23 -32 C21 -14 12 -9 0 -9 C-12 -9 -21 -14 -23 -32 Z" opacity="0.92" />
          <path d="M-11 -24 Q0 -30 11 -24 Q6 -21 0 -22.5 Q-6 -21 -11 -24 Z" />
        </g>
      )}
      {hair === 'ramesh' && (
        <path d="M-12 -24 Q0 -31 12 -24 Q12 -20 8 -21 Q0 -25 -8 -21 Q-12 -20 -12 -24 Z" fill={hairColor} />
      )}

      {/* nose */}
      <path d="M0 -36 Q-4 -26 -2 -25 Q1 -24 3 -26" stroke={skin.shade} strokeWidth="2.4" fill="none" strokeLinecap="round" />

      <Eyes expression={expression} />
      <Brows expression={expression} color={hairColor} />
      <Mouth expression={expression} />

      {bindi && <circle cx="0" cy="-50" r="2.6" fill="#C8342A" />}

      {glasses && (
        <g stroke="#1E1714" strokeWidth="2.4" fill="rgba(255,255,255,0.18)">
          <rect x="-21" y="-43" width="17" height="13" rx="5" />
          <rect x="4" y="-43" width="17" height="13" rx="5" />
          <path d="M-4 -37 L4 -37" fill="none" />
        </g>
      )}

      {/* hair on top */}
      {hair === 'rahul' && (
        <g fill={hairColor}>
          <path d="M-29 -38 C-34 -66 -14 -80 6 -78 C26 -77 36 -62 30 -40 C28 -50 22 -56 12 -58 C2 -60 -4 -55 -14 -56 C-20 -54 -26 -48 -29 -38 Z" />
          <path d="M-14 -56 C-6 -70 14 -72 24 -60 C16 -64 2 -62 -14 -56 Z" fill="#3A2A1E" />
          <rect x="-30" y="-42" width="5" height="14" rx="2" />
          <rect x="25" y="-42" width="5" height="14" rx="2" />
        </g>
      )}
      {hair === 'priya' && (
        <g fill={hairColor}>
          <path d="M-30 -36 C-34 -68 -12 -78 0 -78 C12 -78 34 -68 30 -36 C26 -52 14 -60 2 -61 L0 -54 L-2 -61 C-14 -60 -26 -52 -30 -36 Z" />
          <circle cx="0" cy="-80" r="12" />
        </g>
      )}
      {hair === 'arjun' && (
        <g fill={hairColor}>
          <path d="M-29 -38 C-33 -60 -22 -76 -2 -76 C20 -76 34 -62 29 -38 C26 -48 20 -56 10 -58 C0 -56 -12 -58 -22 -52 C-26 -48 -28 -44 -29 -38 Z" />
          {[-20, -10, 0, 10, 20].map((x) => (
            <circle key={x} cx={x} cy={-72 + Math.abs(x) * 0.25} r="7" />
          ))}
        </g>
      )}
      {hair === 'ramesh' && (
        <g fill={hairColor}>
          <path d="M-29 -40 C-30 -66 -12 -74 2 -74 C20 -74 32 -64 29 -40 C27 -52 18 -58 0 -58 C-16 -58 -26 -52 -29 -40 Z" />
        </g>
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Arms                                                                */
/* ------------------------------------------------------------------ */

/**
 * An arm made of two segments. Angles in degrees.
 *  shoulder: positive = swing outward from the body
 *  elbow:    positive = bend inward (toward the body centre / upward)
 * Children are rendered at the hand, counter-rotated so held objects stay upright
 * (unless keepRotation is set).
 */
export function Arm({
  side = 'L',
  shoulder = 8,
  elbow = 6,
  sleeve,
  cuff,
  skin,
  upper = 66,
  fore = 60,
  sleeveToWrist = true,
  children,
  keepRotation = false,
  className,
}) {
  const sign = side === 'L' ? 1 : -1;
  const shoulderMV = useMV(shoulder);
  const elbowMV = useMV(elbow);
  const sT = useTransform(shoulderMV, (v) => `rotate(${sign * v})`);
  const eT = useTransform(elbowMV, (v) => `translate(0 ${upper}) rotate(${-sign * v})`);
  const counter = useTransform([shoulderMV, elbowMV], ([a, b]) =>
    `translate(0 ${fore + 2})${keepRotation ? '' : ` rotate(${-(sign * a - sign * b)})`}`
  );
  return (
    <AttrG transform={sT} className={className}>
      <line x1="0" y1="0" x2="0" y2={upper} stroke={sleeve} strokeWidth="23" strokeLinecap="round" />
      <AttrG transform={eT}>
        {sleeveToWrist ? (
          <>
            <line x1="0" y1="0" x2="0" y2={fore - 16} stroke={sleeve} strokeWidth="20" strokeLinecap="round" />
            {cuff && <line x1="0" y1={fore - 20} x2="0" y2={fore - 14} stroke={cuff} strokeWidth="20" />}
            <line x1="0" y1={fore - 16} x2="0" y2={fore - 2} stroke={skin.shade} strokeWidth="13" strokeLinecap="round" />
          </>
        ) : (
          <>
            <line x1="0" y1="-4" x2="0" y2={fore - 2} stroke={skin.base} strokeWidth="15" strokeLinecap="round" />
          </>
        )}
        <circle cx="0" cy={fore + 2} r="10.5" fill={skin.base} />
        {children && <AttrG transform={counter}>{children}</AttrG>}
      </AttrG>
    </AttrG>
  );
}

/**
 * <g> whose `transform` attribute is driven by a MotionValue<string>.
 * Updates the DOM attribute directly — no React re-render per frame.
 */
export function AttrG({ transform, children, ...rest }) {
  const ref = useRef(null);
  const isMV = isMotionValue(transform);
  useEffect(() => {
    if (!isMV) return undefined;
    const el = ref.current;
    if (el) el.setAttribute('transform', transform.get());
    return transform.on('change', (v) => el && el.setAttribute('transform', v));
  }, [transform, isMV]);
  return (
    <g ref={ref} transform={isMV ? transform.get() : transform} {...rest}>
      {children}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Legs                                                                */
/* ------------------------------------------------------------------ */

/**
 * Legs. `swing` (MotionValue<number> in degrees) swings them like a walk cycle,
 * driven by scroll, so Rahul only "walks" while the visitor scrolls.
 */
function Legs({ trouser, shoe, swing }) {
  const swingMV = useMV(swing ?? 0);
  const a = useTransform(swingMV, (v) => `rotate(${v} -16 -138)`);
  const b = useTransform(swingMV, (v) => `rotate(${-v} 16 -138)`);
  return (
    <g>
      <AttrG transform={b}>
        <rect x="3" y="-138" width="27" height="132" rx="11" fill={trouser} />
        <path d="M34 -10 Q34 -18 24 -18 L8 -18 Q2 -18 2 -10 L2 0 L40 0 Q42 -6 34 -10 Z" fill={shoe} />
      </AttrG>
      <AttrG transform={a}>
        <rect x="-30" y="-138" width="27" height="132" rx="11" fill={trouser} />
        <path d="M-34 -10 Q-34 -18 -24 -18 L-8 -18 Q-2 -18 -2 -10 L-2 0 L-40 0 Q-42 -6 -34 -10 Z" fill={shoe} />
      </AttrG>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* RAHUL — restaurant owner (the hero)                                 */
/* ------------------------------------------------------------------ */

const RAHUL_POSES = {
  rest: { L: [8, 6], R: [8, 6] },
  hips: { L: [38, 118], R: [38, 118] },
  frustrated: { L: [146, 128], R: [146, 128] },
  wave: { L: [8, 6], R: [150, 22] },
  phone: { L: [8, 6], R: [24, 104] },
  present: { L: [8, 6], R: [62, 28] },
  welcome: { L: [48, 22], R: [48, 22] },
  thinking: { L: [20, 112], R: [26, 150] },
};

/**
 * Rahul. Off-white kurta, forest-green Nehru vest with brass buttons,
 * charcoal trousers, side-parted hair and a trimmed beard.
 *
 * pose: rest | hips | frustrated | wave | phone | present | welcome | thinking
 * expression: neutral | smile | frustrated | curious
 * handItem: optional SVG rendered in his right hand (viewer's right)
 */
export function Rahul({ pose = 'rest', expression = 'neutral', swing, handItem = null, armR = null }) {
  const skin = SKIN.rahul;
  const kurta = '#FBF1E1';
  const kurtaShade = '#EADBC3';
  const vest = palette.green;
  const p = RAHUL_POSES[pose] || RAHUL_POSES.rest;
  return (
    <g className="character character-rahul">
      <ellipse cx="0" cy="2" rx="62" ry="9" fill="#000" opacity="0.12" />
      <Legs trouser={palette.charcoal} shoe="#5A3A26" swing={swing} />

      {/* back arm (viewer left) */}
      <g transform="translate(-42 -226)">
        <Arm side="L" shoulder={p.L[0]} elbow={p.L[1]} sleeve={kurtaShade} skin={skin} />
      </g>

      {/* kurta */}
      <path d="M-44 -232 Q-52 -170 -50 -104 L50 -104 Q52 -170 44 -232 Q0 -246 -44 -232 Z" fill={kurta} />
      <path d="M-50 -110 L50 -110 L50 -104 L-50 -104 Z" fill={kurtaShade} />
      {/* vest */}
      <path d="M-44 -230 L-11 -238 L-3 -196 L-3 -128 L-46 -128 Q-50 -182 -44 -230 Z" fill={vest} />
      <path d="M44 -230 L11 -238 L3 -196 L3 -128 L46 -128 Q50 -182 44 -230 Z" fill={vest} />
      <path d="M-11 -238 L0 -224 L11 -238 L6 -242 L0 -234 L-6 -242 Z" fill={kurtaShade} />
      <g fill="#D9A441">
        <circle cx="6" cy="-186" r="2.6" />
        <circle cx="6" cy="-166" r="2.6" />
        <circle cx="6" cy="-146" r="2.6" />
      </g>
      {/* pocket square */}
      <path d="M-34 -196 L-18 -196 L-18 -190 L-34 -190 Z" fill={palette.orange} />

      <g transform="translate(0 -244)">
        <Head skin={skin} hair="rahul" hairColor="#22180F" expression={expression} beard />
        {expression === 'frustrated' && (
          <path className="sweat" d="M34 -62 Q40 -52 34 -48 Q28 -52 34 -62 Z" fill="#8FD3F4" />
        )}
      </g>

      {/* front arm (viewer right) */}
      <g transform="translate(42 -226)">
        <Arm side="R" shoulder={armR ? armR[0] : p.R[0]} elbow={armR ? armR[1] : p.R[1]} sleeve={kurta} skin={skin}>
          {handItem}
        </Arm>
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Customers (drawn from the waist up — they sit behind tables)        */
/* ------------------------------------------------------------------ */

/** Priya — customer in an orange kurti with a lime dupatta. */
export function CustomerPriya({ expression = 'neutral', armL = [10, 40], armR = [14, 70], handItem = null, handItemL = null }) {
  const skin = SKIN.priya;
  return (
    <g className="character character-priya">
      <g transform="translate(-36 -150)">
        <Arm side="L" shoulder={armL[0]} elbow={armL[1]} sleeve="#E07A35" skin={skin} upper={58} fore={54} sleeveToWrist={false}>
          {handItemL}
        </Arm>
      </g>
      <path d="M-38 -156 Q-46 -100 -44 -20 L44 -20 Q46 -100 38 -156 Q0 -168 -38 -156 Z" fill={palette.orange} />
      <g fill="#FFF3DF" opacity="0.75">
        {[-24, 0, 24].map((x) => [-120, -90, -60].map((y) => <circle key={`${x}${y}`} cx={x} cy={y} r="2.4" />))}
      </g>
      <path d="M-36 -158 Q-6 -120 30 -44 L44 -46 Q14 -118 -18 -162 Z" fill={palette.lime} />
      <path d="M-10 -162 Q0 -150 10 -162" stroke="#C9692C" strokeWidth="4" fill="none" />
      <g transform="translate(0 -166)">
        <Head skin={skin} hair="priya" hairColor="#1A120D" expression={expression} bindi earrings />
      </g>
      <g transform="translate(36 -150)">
        <Arm side="R" shoulder={armR[0]} elbow={armR[1]} sleeve="#E07A35" skin={skin} upper={58} fore={54} sleeveToWrist={false}>
          {handItem}
        </Arm>
      </g>
    </g>
  );
}

/** Arjun — customer with curly hair, glasses and a lime shirt. */
export function CustomerArjun({ expression = 'neutral', armL = [12, 70], armR = [10, 40], handItem = null }) {
  const skin = SKIN.arjun;
  const shirt = '#B8E65A';
  return (
    <g className="character character-arjun">
      <g transform="translate(-40 -154)">
        <Arm side="L" shoulder={armL[0]} elbow={armL[1]} sleeve={shirt} skin={skin} upper={60} fore={56} sleeveToWrist={false}>
          {handItem}
        </Arm>
      </g>
      <path d="M-42 -160 Q-50 -100 -48 -20 L48 -20 Q50 -100 42 -160 Q0 -172 -42 -160 Z" fill={shirt} />
      <path d="M-14 -168 L0 -150 L14 -168 L8 -172 L0 -160 L-8 -172 Z" fill="#8DBA3E" />
      <path d="M0 -150 L0 -30" stroke="#8DBA3E" strokeWidth="2" />
      <g transform="translate(0 -170)">
        <Head skin={skin} hair="arjun" hairColor="#17110C" expression={expression} glasses />
      </g>
      <g transform="translate(40 -154)">
        <Arm side="R" shoulder={armR[0]} elbow={armR[1]} sleeve={shirt} skin={skin} upper={60} fore={56} sleeveToWrist={false} />
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Ramesh — the waiter                                                 */
/* ------------------------------------------------------------------ */

export function Waiter({ expression = 'smile', swing, tray = true, trayItem = null }) {
  const skin = SKIN.ramesh;
  const shirt = '#FFFFFF';
  const vest = palette.charcoal;
  return (
    <g className="character character-waiter">
      <ellipse cx="0" cy="2" rx="58" ry="8" fill="#000" opacity="0.12" />
      <Legs trouser="#1F2421" shoe="#121512" swing={swing} />
      <g transform="translate(-40 -222)">
        <Arm side="L" shoulder={10} elbow={8} sleeve="#EDEDED" skin={skin} />
      </g>
      <path d="M-42 -228 Q-50 -170 -48 -104 L48 -104 Q50 -170 42 -228 Q0 -242 -42 -228 Z" fill={shirt} />
      <path d="M-42 -226 L-10 -234 L-2 -170 L-2 -112 L-44 -112 Q-48 -170 -42 -226 Z" fill={vest} />
      <path d="M42 -226 L10 -234 L2 -170 L2 -112 L44 -112 Q48 -170 42 -226 Z" fill={vest} />
      {/* bow tie */}
      <path d="M-12 -236 L0 -230 L12 -236 L12 -222 L0 -228 L-12 -222 Z" fill={palette.orange} />
      {/* apron */}
      <path d="M-40 -130 L40 -130 L36 -60 L-36 -60 Z" fill={palette.green} />
      <path d="M-40 -130 L40 -130" stroke="#0F2B23" strokeWidth="4" />
      {/* towel on arm side */}
      <g transform="translate(0 -240)">
        <Head skin={skin} hair="ramesh" hairColor="#1C140E" expression={expression} />
      </g>
      <g transform="translate(40 -222)">
        {tray ? (
          <Arm side="R" shoulder={70} elbow={-110} sleeve={shirt} skin={skin}>
            <g transform="translate(6 -12)">
              <ellipse cx="0" cy="0" rx="58" ry="9" fill="#C9CED0" />
              <ellipse cx="0" cy="-3" rx="58" ry="8" fill="#E7EBEC" />
              {trayItem}
            </g>
          </Arm>
        ) : (
          <Arm side="R" shoulder={10} elbow={8} sleeve={shirt} skin={skin} />
        )}
      </g>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Small props                                                          */
/* ------------------------------------------------------------------ */

/** Handheld phone, drawn upright and centred on the hand. */
export function HandPhone({ screen = '#173D32', w = 30, h = 54, children }) {
  return (
    <g transform={`translate(${-w / 2} ${-h + 10})`}>
      <rect width={w} height={h} rx="6" fill="#1B1F1D" />
      <rect x="2.5" y="4" width={w - 5} height={h - 8} rx="3.5" fill={screen} />
      {children}
    </g>
  );
}

/** A steaming plate of biryani for trays and tables. */
export function BiryaniPlate({ scale = 1 }) {
  return (
    <g transform={`scale(${scale})`}>
      <ellipse cx="0" cy="-4" rx="34" ry="8" fill="#F4F1EA" />
      <path d="M-26 -8 Q-24 -34 0 -36 Q24 -34 26 -8 Z" fill="#E8A33D" />
      <g fill="#F7D77B">
        <circle cx="-12" cy="-20" r="3" />
        <circle cx="4" cy="-26" r="3" />
        <circle cx="14" cy="-16" r="3" />
        <circle cx="-2" cy="-14" r="3" />
      </g>
      <g fill="#5BA346">
        <circle cx="-6" cy="-30" r="2.6" />
        <circle cx="10" cy="-24" r="2.6" />
      </g>
      <g className="steam" stroke="#FFFFFF" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.8">
        <path d="M-8 -44 Q-14 -54 -8 -62" />
        <path d="M6 -44 Q0 -56 6 -66" />
      </g>
    </g>
  );
}

/** Motion helper for any group: a <g> wrapper that accepts motion style. */
export const MG = motion.g;
