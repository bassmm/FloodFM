import { VillageList } from '../Villages/VillageList';
import { FloodMap } from '../Map/FloodMap';
import type { VillageFloodData } from '../../types/village.types';

interface OverviewTabProps {
  villages: VillageFloodData[];
}

export const OverviewTab = ({ villages }: OverviewTabProps) => {
  // Show only villages with warning or critical alert levels in overview
  const alertFilteredVillages = villages.filter(v => v.alertLevel === 'warning' || v.alertLevel === 'critical');
  return (
    <div>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: 0 }}>
        Current Status Overview
      </h2>

      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
        Monitored Villages
      </h2>
      <VillageList villages={alertFilteredVillages} />

      <h2 style={{ fontSize: '1.25rem', margin: '1.5rem 0 1rem' }}>
        Village Locations Map
      </h2>
      <div style={{ marginBottom: '1.5rem' }}>
        <FloodMap villages={alertFilteredVillages} />
      </div>
    </div>
  );
};
