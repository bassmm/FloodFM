import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Tooltip, useMap } from 'react-leaflet';
import type { Layer, PathOptions } from 'leaflet';
import type { VillageFloodData } from '../../types/village.types';
import { getAlertColor } from '../../utils/alertLevels';
import { formatNumber } from '../../utils/formatters';
import 'leaflet/dist/leaflet.css';
import './FloodMap.css';

interface FloodMapProps {
  villages: VillageFloodData[];
  onVillageClick?: (village: VillageFloodData) => void;
}

function SetMapBounds() {
  const map = useMap();
  
  useEffect(() => {
    // Set bounds to Pakistan only
    map.setMaxBounds([
      [23.5, 60.5],  // Southwest
      [37.5, 77.5],  // Northeast
    ]);
  }, [map]);
  
  return null;
}

export function FloodMap({ villages, onVillageClick }: FloodMapProps) {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    // Fetch Pakistan GeoJSON data
    fetch('https://raw.githubusercontent.com/geodata-pk/pak-admin-boundaries/master/pak_admin0.geojson')
      .then(response => response.json())
      .then(data => setGeoData(data))
      .catch(error => console.error('Error loading Pakistan GeoJSON:', error));
  }, []);

  // Calculate district-level alert severity
  const getDistrictAlertLevel = (districtName: string): 'normal' | 'warning' | 'critical' | 'none' => {
    const districtVillages = villages.filter(v => 
      v.district.toLowerCase().includes(districtName.toLowerCase()) ||
      districtName.toLowerCase().includes(v.district.toLowerCase())
    );
    
    if (districtVillages.length === 0) return 'none';
    
    // Return highest alert level in district
    if (districtVillages.some(v => v.alertLevel === 'critical')) return 'critical';
    if (districtVillages.some(v => v.alertLevel === 'warning')) return 'warning';
    return 'normal';
  };

  const style = (feature?: any): PathOptions => {
    const districtName = feature?.properties?.NAME_1 || feature?.properties?.name || '';
    const alertLevel = getDistrictAlertLevel(districtName);
    
    let fillColor = '#d3d3d3'; // Default gray for areas with no data
    let fillOpacity = 0.3;
    
    switch(alertLevel) {
      case 'critical':
        fillColor = '#c0152f';
        fillOpacity = 0.7;
        break;
      case 'warning':
        fillColor = '#f5a60e';
        fillOpacity = 0.6;
        break;
      case 'normal':
        fillColor = '#22b86d';
        fillOpacity = 0.5;
        break;
    }
    
    return {
      fillColor,
      fillOpacity,
      color: '#333',
      weight: 2,
      opacity: 0.8,
    };
  };

  const onEachFeature = (feature: any, layer: Layer) => {
    const districtName = feature.properties?.NAME_1 || feature.properties?.name || 'Unknown';
    const districtVillages = villages.filter(v => 
      v.district.toLowerCase().includes(districtName.toLowerCase()) ||
      districtName.toLowerCase().includes(v.district.toLowerCase())
    );

    if (districtVillages.length > 0) {
      const alertLevel = getDistrictAlertLevel(districtName);
      const colorMap: Record<string, string> = {
        critical: '#c0152f',
        warning: '#f5a60e',
        normal: '#22b86d',
        none: '#d3d3d3'
      };
      layer.bindTooltip(
        `<strong>${districtName}</strong><br/>
         Villages: ${districtVillages.length}<br/>
         Alert: <span style="color: ${colorMap[alertLevel]}">${alertLevel.toUpperCase()}</span>`,
        { sticky: true }
      );
    }

    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 3,
          opacity: 1,
          fillOpacity: 0.9,
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle(style(feature));
      },
    });
  };

  return (
    <MapContainer
      center={[30.3753, 69.3451]}
      zoom={7}
      minZoom={5}
      maxZoom={10}
      style={{ height: '600px', width: '100%', borderRadius: '8px' }}
      scrollWheelZoom={true}
      className="flood-map"
      maxBounds={[[23.5, 60.5], [37.5, 77.5]]}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        maxZoom={19}
      />
      
      <SetMapBounds />
      
      {geoData && (
        <GeoJSON 
          data={geoData} 
          style={style}
          onEachFeature={onEachFeature}
        />
      )}
      
      {villages.map((village) => (
        <CircleMarker
          key={village.name}
          center={[village.lat, village.lon]}
          radius={8}
          pathOptions={{
            fillColor: getAlertColor(village.alertLevel),
            fillOpacity: 0.9,
            color: '#fff',
            weight: 2,
          }}
          eventHandlers={{
            click: () => onVillageClick?.(village),
          }}
        >
          <Tooltip 
            direction="top" 
            offset={[0, -10]} 
            opacity={0.95}
            permanent={false}
          >
            <div style={{ minWidth: '220px' }}>
              <strong style={{ 
                fontSize: '1.1em', 
                color: getAlertColor(village.alertLevel),
                display: 'block',
                marginBottom: '8px'
              }}>
                {village.name}
              </strong>
              <div style={{ fontSize: '0.9em', lineHeight: '1.6' }}>
                <div><strong>Province:</strong> {village.province}</div>
                <div><strong>District:</strong> {village.district}</div>
                <div><strong>Population:</strong> {formatNumber(village.population)}</div>
                <div><strong>Current Discharge:</strong> {formatNumber(village.currentDischarge)} m³/s</div>
                <div>
                  <strong>Alert:</strong>{' '}
                  <span style={{ 
                    fontWeight: 'bold',
                    color: getAlertColor(village.alertLevel)
                  }}>
                    {village.alertLevel.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
