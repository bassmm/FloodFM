import { VillageCard } from './VillageCard';
import type { VillageFloodData } from '../../types/village.types';

interface VillageListProps {
  villages: VillageFloodData[];
}

export const VillageList = ({ villages }: VillageListProps) => {
  // Sort by severity: critical > warning > normal, then by currentDischarge desc
  const severityOrder: Record<string, number> = { critical: 3, warning: 2, normal: 1 };
  const sorted = [...villages].sort((a, b) => {
    const sa = severityOrder[a.alertLevel] || 0;
    const sb = severityOrder[b.alertLevel] || 0;
    if (sb !== sa) return sb - sa;
    return (b.currentDischarge ?? 0) - (a.currentDischarge ?? 0);
  });

  return (
    <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
      {sorted.map((village) => (
        <VillageCard key={village.name} village={village} />
      ))}
    </div>
  );
};
