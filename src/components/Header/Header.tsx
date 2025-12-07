import { ThemeToggle } from './ThemeToggle';
import { StatusIndicator } from './StatusIndicator';
import { formatTime } from '../../utils/formatters';
import type { Theme } from '../../hooks/useTheme';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: () => void;
  lastUpdate: Date;
}

export const Header = ({ theme, onToggleTheme, lastUpdate }: HeaderProps) => {
  return (
    <header style={{ padding: '1rem', marginBottom: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: '0.25rem 0', fontSize: '1.75rem' }}>
            FloodFM
          </h1>
          <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', opacity: 0.8 }}>
            Real-time river discharge monitoring for Sindh & Punjab
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div>
            <StatusIndicator />
            <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.25rem' }}>
              Last updated: {formatTime(lastUpdate)}
            </div>
          </div>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  );
};
