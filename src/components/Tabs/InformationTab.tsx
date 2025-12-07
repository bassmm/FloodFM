import { InfoSection } from '../Information/InfoSection';
import { AlertLevelGuide } from '../Information/AlertLevelGuide';
import { EmergencyContacts } from '../Information/EmergencyContacts';
import { FAQ } from '../Information/FAQ';

export const InformationTab = () => {
  return (
    <div>
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', marginTop: 0 }}>
        Flood Information & Preparedness
      </h2>

      <InfoSection title="📚 Understanding River Discharge">
        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
          <strong>River Discharge</strong> is measured in cubic meters per second (m³/s) and
          represents the volume of water flowing through a river at any given time.
        </p>
        <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>
          The Open-Meteo Global Flood API provides data from the Global Flood Awareness System
          (GloFAS), offering:
        </p>
        <ul style={{ margin: '0.5rem 0 0.5rem 1.25rem', fontSize: '0.9rem' }}>
          <li style={{ margin: '0.25rem 0' }}>Historical data from 1984 to present</li>
          <li style={{ margin: '0.25rem 0' }}>30-day flood forecasts (updated daily)</li>
          <li style={{ margin: '0.25rem 0' }}>5 km spatial resolution across global river networks</li>
          <li style={{ margin: '0.25rem 0' }}>Ensemble forecast data for confidence assessments</li>
        </ul>
      </InfoSection>

      <InfoSection title="🚨 Alert Level Interpretation">
        <AlertLevelGuide />
      </InfoSection>

      <InfoSection title="🏃 Flood Preparedness Checklist">
        <ul style={{ margin: '0.75rem 0 0 1.25rem', fontSize: '0.9rem', listStyle: 'none', padding: 0 }}>
          <li style={{ margin: '0.25rem 0' }}>✓ Prepare emergency evacuation routes and assembly points</li>
          <li style={{ margin: '0.25rem 0' }}>✓ Stock emergency supplies: water, food, first aid, medications</li>
          <li style={{ margin: '0.25rem 0' }}>✓ Have important documents (IDs, property deeds) in waterproof containers</li>
          <li style={{ margin: '0.25rem 0' }}>✓ Know your nearest shelter and relief camp locations</li>
          <li style={{ margin: '0.25rem 0' }}>✓ Keep emergency contact numbers saved (NDMA, PDMA, local authorities)</li>
          <li style={{ margin: '0.25rem 0' }}>✓ Inform vulnerable family members of evacuation plans</li>
          <li style={{ margin: '0.25rem 0' }}>✓ Monitor weather forecasts and government alerts daily during monsoon season</li>
          <li style={{ margin: '0.25rem 0' }}>✓ Have a communication plan if separated from family</li>
        </ul>
      </InfoSection>

      <EmergencyContacts />

      <InfoSection title="❓ Frequently Asked Questions">
        <FAQ />
      </InfoSection>
    </div>
  );
};
