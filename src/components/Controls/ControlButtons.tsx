interface ControlButtonsProps {
  onRefresh: () => void;
  loading: boolean;
}

export const ControlButtons = ({ onRefresh, loading }: ControlButtonsProps) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '0.5rem',
        marginBottom: '1rem',
      }}
    >
      <button onClick={onRefresh} disabled={loading} style={{ margin: 0 }}>
        {loading ? '⏳ Refreshing...' : '🔄 Refresh Data'}
      </button>
    </div>
  );
};
