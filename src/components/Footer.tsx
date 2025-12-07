import { formatTime } from '../utils/formatters';

interface FooterProps {
  lastUpdate: Date;
}

export const Footer = ({ lastUpdate }: FooterProps) => {
  return (
    <footer
      style={{
        padding: '1rem',
        textAlign: 'center',
        fontSize: '0.8rem',
        opacity: 0.7,
        marginTop: '1.5rem',
      }}
    >
      <p style={{ margin: '0.25rem 0' }}>
        <strong>Data Source:</strong> Open-Meteo Global Flood API (GloFAS v4)
      </p>
      <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
        Last updated: {formatTime(lastUpdate)} | Data refresh interval: Every 6 hours
      </p>
      <p style={{ fontSize: '0.8rem', marginTop: '1rem' }}>
        Developed for flood early-warning in Pakistan | © 2025 Flood Early-Warning System
      </p>
    </footer>
  );
};
