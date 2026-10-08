// Official The Tavqo Organic Emblem & Wordmark Component
import { forwardRef } from 'react';
import { emblemStems, emblemLeaves, emblemHighlights, wordmarkPaths } from './tavqoLogoData';

/**
 * The Tavqo Logo
 * Preserves authentic SVG geometry without distortion.
 * - variant="full": Complete horizontal lockup (wordmark + organic botanical emblem)
 * - variant="mark": Compact standalone botanical mark
 */
const TheTavqoLogo = forwardRef(function TheTavqoLogo(
  {
    className = 'w-full h-auto',
    variant = 'full',
    style = {},
    showAccentLine = true,
    accentLineRef = null,
    ...props
  },
  ref
) {
  if (variant === 'mark') {
    return (
      <svg
        ref={ref}
        viewBox="1300 70 460 570"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          overflow: 'visible',
          ...style,
        }}
        {...props}
      >
        <g id="tavqo-standalone-mark">
          {emblemStems.map((p, i) => (
            <path key={'s-' + i} d={p.d} fill={p.fill} transform={p.tr} />
          ))}
          {emblemLeaves.map((p, i) => (
            <path key={'l-' + i} d={p.d} fill={p.fill} transform={p.tr} />
          ))}
          {emblemHighlights.map((p, i) => (
            <path key={'h-' + i} d={p.d} fill={p.fill} transform={p.tr} />
          ))}
        </g>
      </svg>
    );
  }

  return (
    <svg
      ref={ref}
      viewBox="320 80 1440 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        width: '100%',
        height: 'auto',
        display: 'block',
        overflow: 'visible',
        ...style,
      }}
      {...props}
    >
      <defs>
        {/* Soft luxury shadow filter */}
        <filter id="tavqo-soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#47260E" floodOpacity="0.05" />
        </filter>
      </defs>

      {/* 1. Central / Right Organic Botanical Emblem */}
      <g id="tavqo-emblem-group">
        {/* Tier 1: Stems & Primary Structure */}
        <g id="tavqo-stems-group">
          {emblemStems.map((p, i) => (
            <path
              key={'stem-' + i}
              d={p.d}
              fill={p.fill}
              transform={p.tr}
              className="tavqo-stem-path"
            />
          ))}
        </g>

        {/* Tier 2: Warm Bronze Botanical Foliage & Leaves */}
        <g id="tavqo-leaves-group">
          {emblemLeaves.map((p, i) => (
            <path
              key={'leaf-' + i}
              d={p.d}
              fill={p.fill}
              transform={p.tr}
              className="tavqo-leaf-path"
            />
          ))}
        </g>

        {/* Tier 3: Delicate Warm Cream Botanical Accents */}
        <g id="tavqo-highlights-group">
          {emblemHighlights.map((p, i) => (
            <path
              key={'hl-' + i}
              d={p.d}
              fill={p.fill}
              transform={p.tr}
              className="tavqo-highlight-path"
            />
          ))}
        </g>
      </g>

      {/* 2. Vector Wordmark: "The Tavq" Typography */}
      <g id="tavqo-wordmark-group">
        {wordmarkPaths.map((p, i) => (
          <path
            key={'wm-' + i}
            d={p.d}
            fill={p.fill}
            transform={p.tr}
            className="tavqo-wordmark-path"
          />
        ))}
      </g>

      {/* 3. Subtle Editorial Botanical Hairline Accent Rule */}
      {showAccentLine && (
        <g id="tavqo-accent-line" ref={accentLineRef} opacity="0">
          <line
            x1="335"
            y1="565"
            x2="1735"
            y2="565"
            stroke="#9F6D44"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />
          <circle cx="1035" cy="565" r="2.2" fill="#9F6D44" fillOpacity="0.6" />
        </g>
      )}
    </svg>
  );
});

export default TheTavqoLogo;
