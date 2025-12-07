import { AlertBadge } from './AlertBadge';
import { DischargeBar } from './DischargeBar';
import { formatNumber } from '../../utils/formatters';
import type { VillageFloodData } from '../../types/village.types';

interface VillageCardProps {
  village: VillageFloodData;
}

export const VillageCard = ({ village }: VillageCardProps) => {
  const borderColors = {
    normal: '#22b86d',
    warning: '#f5a60e',
    critical: '#c0152f',
  };

  return (
    <div
      style={{
        padding: '0.75rem',
        borderLeft: `4px solid ${borderColors[village.alertLevel]}`,
        margin: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ fontSize: '1rem', fontWeight: 600 }}>
          {village.name}{' '}
          <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>{village.district}</span>
        </div>
        <AlertBadge level={village.alertLevel} />
      </div>
      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '0.5rem',
          fontSize: '0.85rem',
          marginBottom: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span style={{ opacity: 0.7, fontWeight: 500 }}>Current Discharge:</span>
          <span style={{ fontWeight: 600 }}>{formatNumber(village.currentDischarge)} m³/s</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span style={{ opacity: 0.7, fontWeight: 500 }}>Forecasted Discharge:</span>
          <span style={{ fontWeight: 600 }}>{formatNumber(village.forecastedDischarge)} m³/s</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span style={{ opacity: 0.7, fontWeight: 500 }}>Population:</span>
          <span style={{ fontWeight: 600 }}>{formatNumber(village.population)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
          <span style={{ opacity: 0.7, fontWeight: 500 }}>Days Above Warning:</span>
          <span style={{ fontWeight: 600 }}>{village.daysAboveThreshold}</span>
        </div>
      </div>
      
      <DischargeBar discharge={village.currentDischarge} alertLevel={village.alertLevel} />
    </div>
  );
};
