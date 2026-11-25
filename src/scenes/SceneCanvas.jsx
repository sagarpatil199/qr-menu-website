import { InteriorBackdrop, VIEW_H, VIEW_W } from '../assets/illustrations/backdrops.jsx';

/**
 * A 1200×760 illustration canvas. SVG children are drawn in world units,
 * `html` is layered on top (absolutely positioned, % based).
 * When `standalone` is set (mobile / reduced motion) the scene draws its own
 * interior backdrop; on the desktop stage the backdrop is shared.
 */
export function SceneCanvas({ label, children, html, standalone = false, tint = 0, className = '', style }) {
  return (
    <div className={`scene-canvas ${className}`} role="img" aria-label={label} style={style}>
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        {standalone && (
          <g>
            <InteriorBackdrop />
            <rect x="0" y="0" width={VIEW_W} height={VIEW_H} fill="#16231D" opacity={tint} />
          </g>
        )}
        {children}
      </svg>
      {html}
    </div>
  );
}
