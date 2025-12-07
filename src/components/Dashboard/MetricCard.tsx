import { formatNumber } from '../../utils/formatters';

interface MetricCardProps {
  label: string;
  value: number;
  unit: string;
}

export const MetricCard = ({ label, value, unit }: MetricCardProps) => {
  return (
    <div className="metric-card" style={{ padding: '0.75rem' }}>
      <div
        className="metric-label"
        style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          opacity: 0.7,
          marginBottom: '0.25rem',
          fontWeight: 600,
          letterSpacing: '0.5px',
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--pico-color-cyan-600)', margin: 0 }}>
        {formatNumber(value)}
        <span style={{ fontSize: '0.7rem', opacity: 0.6, marginLeft: '0.25rem' }}>{unit}</span>
      </div>
    </div>
  );
};
