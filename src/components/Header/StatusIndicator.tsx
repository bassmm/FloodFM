export const StatusIndicator = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
      <span
        className="status-indicator"
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#22b86d',
          animation: 'pulse 2s infinite',
        }}
      />
      <span>System Active</span>
    </div>
  );
};
