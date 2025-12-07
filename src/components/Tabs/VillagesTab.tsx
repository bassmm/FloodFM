import type { VillageFloodData, AlertLevel } from '../../types/village.types';
import { VillageList } from '../Villages/VillageList';
import { Filters } from '../Controls/Filters';

interface VillagesTabProps {
  villages: VillageFloodData[];
  provinceFilter: string;
  alertFilter: AlertLevel | '';
  onProvinceChange: (province: string) => void;
  onAlertChange: (alert: AlertLevel | '') => void;
}

export const VillagesTab = ({ villages, provinceFilter, alertFilter, onProvinceChange, onAlertChange }: VillagesTabProps) => {
  return (
    <div>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: 0 }}>
        Village Details & Forecasts
      </h2>
      <Filters
        provinceFilter={provinceFilter}
        alertFilter={alertFilter}
        onProvinceChange={onProvinceChange}
        onAlertChange={onAlertChange}
      />
      <VillageList villages={villages} />
    </div>
  );
};
