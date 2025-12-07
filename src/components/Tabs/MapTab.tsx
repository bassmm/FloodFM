import { useState } from 'react';
import { FloodMap } from '../Map/FloodMap';
import { AlertBadge } from '../Villages/AlertBadge';
import { formatNumber } from '../../utils/formatters';
import type { VillageFloodData } from '../../types/village.types';

interface MapTabProps {
  villages: VillageFloodData[];
}

export function MapTab({ villages }: MapTabProps) {
  const [selectedVillage, setSelectedVillage] = useState<VillageFloodData | null>(null);

  const alertCounts = {
    normal: villages.filter(v => v.alertLevel === 'normal').length,
    warning: villages.filter(v => v.alertLevel === 'warning').length,
    critical: villages.filter(v => v.alertLevel === 'critical').length,
  };

  return (
    <div>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', marginTop: 0 }}>
        Village Locations & Flood Status
      </h2>
      <p style={{ marginBottom: '1rem', opacity: 0.8, fontSize: '0.9rem' }}>
        Hover over markers for quick information. Click for detailed view.
      </p>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1rem',
          flexWrap: 'wrap',
          fontSize: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#22b86d',
              display: 'inline-block',
            }}
          />
          <span>Normal ({alertCounts.normal})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#f5a60e',
              display: 'inline-block',
            }}
          />
          <span>Warning ({alertCounts.warning})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#c0152f',
              display: 'inline-block',
              animation: alertCounts.critical > 0 ? 'pulse 2s infinite' : 'none',
            }}
          />
          <span>Critical ({alertCounts.critical})</span>
        </div>
      </div>

      <FloodMap villages={villages} onVillageClick={setSelectedVillage} />

      {selectedVillage && (
        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            border: '2px solid var(--pico-border-color)',
            borderRadius: '8px',
            backgroundColor: 'var(--pico-card-background-color)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
            <h3 style={{ margin: 0, fontSize: '1.5rem' }}>{selectedVillage.name}</h3>
            <AlertBadge level={selectedVillage.alertLevel} />
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              fontSize: '0.9rem',
            }}
          >
            <div>
              <div style={{ opacity: 0.7, fontSize: '0.8rem', marginBottom: '0.25rem' }}>Province</div>
              <div style={{ fontWeight: 600 }}>{selectedVillage.province}</div>
            </div>
            <div>
              <div style={{ opacity: 0.7, fontSize: '0.8rem', marginBottom: '0.25rem' }}>District</div>
              <div style={{ fontWeight: 600 }}>{selectedVillage.district}</div>
            </div>
            <div>
              <div style={{ opacity: 0.7, fontSize: '0.8rem', marginBottom: '0.25rem' }}>Population</div>
              <div style={{ fontWeight: 600 }}>{formatNumber(selectedVillage.population)}</div>
            </div>
            <div>
              <div style={{ opacity: 0.7, fontSize: '0.8rem', marginBottom: '0.25rem' }}>Current Discharge</div>
              <div style={{ fontWeight: 600 }}>{formatNumber(selectedVillage.currentDischarge)} m³/s</div>
            </div>
            <div>
              <div style={{ opacity: 0.7, fontSize: '0.8rem', marginBottom: '0.25rem' }}>Forecasted Discharge</div>
              <div style={{ fontWeight: 600 }}>{formatNumber(selectedVillage.forecastedDischarge)} m³/s</div>
            </div>
            <div>
              <div style={{ opacity: 0.7, fontSize: '0.8rem', marginBottom: '0.25rem' }}>Days Above Warning</div>
              <div style={{ fontWeight: 600 }}>{selectedVillage.daysAboveThreshold} days</div>
            </div>
            <div>
              <div style={{ opacity: 0.7, fontSize: '0.8rem', marginBottom: '0.25rem' }}>Baseline Discharge</div>
              <div style={{ fontWeight: 600 }}>{formatNumber(selectedVillage.baselineDischarge)} m³/s</div>
            </div>
            <div>
              <div style={{ opacity: 0.7, fontSize: '0.8rem', marginBottom: '0.25rem' }}>High Risk Period</div>
              <div style={{ fontWeight: 600 }}>{selectedVillage.highRiskMonths}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
