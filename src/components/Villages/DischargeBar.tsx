import type { AlertLevel } from '../../types/village.types';
import { getAlertPercentage } from '../../utils/alertLevels';

interface DischargeBarProps {
  discharge: number;
  alertLevel: AlertLevel;
}

export const DischargeBar = ({ discharge, alertLevel }: DischargeBarProps) => {
  const percentage = getAlertPercentage(discharge);

  const colors = {
    normal: '#22b86d',
    warning: '#f5a60e',
    critical: '#c0152f',
  };

  return (
    <div
      style={{
        height: '6px',
        borderRadius: '3px',
        overflow: 'hidden',
        marginTop: '0.4rem',
        background: 'var(--pico-form-element-background-color)',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${percentage}%`,
          background: colors[alertLevel],
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
};
