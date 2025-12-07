import type { AlertLevel } from '../../types/village.types';

interface AlertBadgeProps {
  level: AlertLevel;
}

export const AlertBadge = ({ level }: AlertBadgeProps) => {
  const colors = {
    normal: { bg: 'rgba(34, 184, 109, 0.15)', color: '#22b86d' },
    warning: { bg: 'rgba(245, 166, 14, 0.15)', color: '#f5a60e' },
    critical: { bg: 'rgba(192, 21, 47, 0.15)', color: '#c0152f' },
  };

  const style = colors[level];

  return (
    <span
      style={{
        padding: '0.2rem 0.5rem',
        borderRadius: '12px',
        fontSize: '0.65rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        background: style.bg,
        color: style.color,
      }}
    >
      {level}
    </span>
  );
};
