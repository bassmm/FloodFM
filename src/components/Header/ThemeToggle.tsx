import { Classic } from '@theme-toggles/react';
import '@theme-toggles/react/css/Classic.css';
import type { Theme } from '../../hooks/useTheme';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle = ({ theme, onToggle }: ThemeToggleProps) => {
  return (
    <Classic
      toggled={theme === 'dark'}
      onToggle={onToggle}
      duration={750}
      title="Toggle dark/light mode"
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
      style={{
        fontSize: '1.5rem',
        padding: '0.5rem',
        color: 'var(--pico-color-cyan-600)',
      }}
    />
  );
};
