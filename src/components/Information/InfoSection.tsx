import type { ReactNode } from 'react';

interface InfoSectionProps {
  title: string;
  children: ReactNode;
}

export const InfoSection = ({ title, children }: InfoSectionProps) => {
  return (
    <div
      style={{
        padding: '0.75rem',
        borderLeft: '3px solid var(--pico-color-cyan-600)',
        marginBottom: '1rem',
      }}
    >
      <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{title}</h3>
      {children}
    </div>
  );
};
