import { useState } from 'react';
import { Header } from './components/Header/Header';
import { DashboardGrid } from './components/Dashboard/DashboardGrid';
import { OverviewTab } from './components/Tabs/OverviewTab';
import { VillagesTab } from './components/Tabs/VillagesTab';
import { MapTab } from './components/Tabs/MapTab';
import { InformationTab } from './components/Tabs/InformationTab';
import { Footer } from './components/Footer';
import { useFloodData } from './hooks/useFloodData';
import { useTheme } from './hooks/useTheme';
import { useFilters } from './hooks/useFilters';
import { calculateDashboardMetrics } from './utils/calculations';
import './styles/global.css';

type Tab = 'overview' | 'villages' | 'map' | 'information';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { data, loading, lastUpdate, refresh } = useFloodData();
  const { provinceFilter, setProvinceFilter, alertFilter, setAlertFilter, filteredData } = useFilters(data);
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const metrics = calculateDashboardMetrics(data);

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} lastUpdate={lastUpdate} />
      
      <div className="container" style={{ padding: '0.5rem 1rem' }}>
        <DashboardGrid metrics={metrics} />
        
        {/* Tabs with right-aligned refresh icon */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--pico-border-color)' }}>
            <button
              onClick={() => setActiveTab('overview')}
              style={{
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontWeight: 500,
                borderBottom: activeTab === 'overview' ? '2px solid var(--pico-color-cyan-600)' : '2px solid transparent',
                color: activeTab === 'overview' ? 'var(--pico-color-cyan-600)' : 'inherit',
                transition: 'all 0.3s ease',
                margin: 0,
              }}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('villages')}
              style={{
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontWeight: 500,
                borderBottom: activeTab === 'villages' ? '2px solid var(--pico-color-cyan-600)' : '2px solid transparent',
                color: activeTab === 'villages' ? 'var(--pico-color-cyan-600)' : 'inherit',
                transition: 'all 0.3s ease',
                margin: 0,
              }}
            >
              Villages
            </button>
            <button
              onClick={() => setActiveTab('map')}
              style={{
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontWeight: 500,
                borderBottom: activeTab === 'map' ? '2px solid var(--pico-color-cyan-600)' : '2px solid transparent',
                color: activeTab === 'map' ? 'var(--pico-color-cyan-600)' : 'inherit',
                transition: 'all 0.3s ease',
                margin: 0,
              }}
            >
              Map
            </button>
            <button
              onClick={() => setActiveTab('information')}
              style={{
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontWeight: 500,
                borderBottom: activeTab === 'information' ? '2px solid var(--pico-color-cyan-600)' : '2px solid transparent',
                color: activeTab === 'information' ? 'var(--pico-color-cyan-600)' : 'inherit',
                transition: 'all 0.3s ease',
                margin: 0,
              }}
            >
              Information
            </button>
          </div>
          <button
            onClick={refresh}
            disabled={loading}
            aria-label="Refresh data"
            title="Refresh data"
            style={{
              margin: 0,
              padding: '0.5rem',
              borderRadius: '999px',
              border: '1px solid var(--pico-border-color)',
              background: 'var(--pico-card-background-color)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
            }}
          >
            {loading ? '⏳' : '🔄'}
          </button>
        </div>


        {activeTab === 'overview' && (
          <OverviewTab villages={filteredData} />
        )}
        
        {activeTab === 'villages' && (
          <VillagesTab
            villages={filteredData}
            provinceFilter={provinceFilter}
            alertFilter={alertFilter}
            onProvinceChange={setProvinceFilter}
            onAlertChange={setAlertFilter}
          />
        )}
        
        {activeTab === 'map' && <MapTab villages={data} />}
        
        {activeTab === 'information' && <InformationTab />}
      </div>

      <Footer lastUpdate={lastUpdate} />
    </>
  );
}

export default App;

