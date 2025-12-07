import type { AlertLevel } from '../../types/village.types';

interface AlertLevelItemProps {
  level: AlertLevel;
  title: string;
  discharge: string;
  description: string;
}

const AlertLevelItem = ({ level, title, discharge, description }: AlertLevelItemProps) => {
  const colors = {
    normal: '#22b86d',
    warning: '#f5a60e',
    critical: '#c0152f',
  };

  return (
    <div style={{ padding: '0.75rem', margin: 0 }}>
      <div
        style={{
          fontWeight: 600,
          marginBottom: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.95rem',
        }}
      >
        <span
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: colors[level],
            flexShrink: 0,
          }}
        />
        <strong>{title}</strong>
      </div>
      <div style={{ fontSize: '0.8rem', lineHeight: 1.4, margin: 0 }}>
        <strong>Discharge:</strong> {discharge}
        <br />
        {description}
      </div>
    </div>
  );
};

export const AlertLevelGuide = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '0.75rem',
        margin: '1rem 0',
      }}
    >
      <AlertLevelItem
        level="normal"
        title="Normal"
        discharge="< 1,000 m³/s"
        description="No immediate flood risk. River flow is within normal seasonal ranges. Continue routine monitoring."
      />
      <AlertLevelItem
        level="warning"
        title="Warning"
        discharge="1,000-3,000 m³/s"
        description="Elevated discharge detected. Prepare evacuation routes. Monitor daily forecasts closely."
      />
      <AlertLevelItem
        level="critical"
        title="Critical"
        discharge="> 3,000 m³/s"
        description="High flood risk. Initiate evacuations immediately. Contact local authorities and relief organizations."
      />
    </div>
  );
};
