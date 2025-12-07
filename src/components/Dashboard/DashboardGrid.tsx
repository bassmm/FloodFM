import { MetricCard } from './MetricCard';
import type { DashboardMetrics } from '../../types/village.types';

interface DashboardGridProps {
  metrics: DashboardMetrics;
}

export const DashboardGrid = ({ metrics }: DashboardGridProps) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1.5rem',
      }}
    >
      <MetricCard
        label="Villages Monitored"
        value={metrics.villagesMonitored}
        unit="villages"
      />
      <MetricCard
        label="At Risk Status"
        value={metrics.atRiskCount}
        unit="villages"
      />
      <MetricCard
        label="Population Affected"
        value={metrics.populationAffected}
        unit="people"
      />
      <MetricCard
        label="Avg Discharge"
        value={metrics.avgDischarge}
        unit="m³/s"
      />
    </div>
  );
};
