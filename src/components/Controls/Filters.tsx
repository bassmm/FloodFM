import type { AlertLevel } from '../../types/village.types';

interface FiltersProps {
  provinceFilter: string;
  alertFilter: AlertLevel | '';
  onProvinceChange: (province: string) => void;
  onAlertChange: (alert: AlertLevel | '') => void;
}

export const Filters = ({
  provinceFilter,
  alertFilter,
  onProvinceChange,
  onAlertChange,
}: FiltersProps) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '0.75rem',
        marginBottom: '1rem',
      }}
    >
      <div style={{ display: 'grid', gap: '0.25rem' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 0 }}>
          Filter by Province:
        </label>
        <select
          value={provinceFilter}
          onChange={(e) => onProvinceChange(e.target.value)}
          style={{ margin: 0 }}
        >
          <option value="">All Provinces</option>
          <option value="Sindh">Sindh</option>
          <option value="Punjab">Punjab</option>
          <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
        </select>
      </div>
      
      <div style={{ display: 'grid', gap: '0.25rem' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 0 }}>
          Filter by Alert Level:
        </label>
        <select
          value={alertFilter}
          onChange={(e) => onAlertChange(e.target.value as AlertLevel | '')}
          style={{ margin: 0 }}
        >
          <option value="">All Levels</option>
          <option value="normal">Normal</option>
          <option value="warning">Warning</option>
          <option value="critical">Critical</option>
        </select>
      </div>
    </div>
  );
};
