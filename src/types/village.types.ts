export interface Village {
  name: string;
  province: "Sindh" | "Punjab" | "Khyber Pakhtunkhwa";
  district: string;
  lat: number;
  lon: number;
  population: number;
  baselineDischarge: number;
  highRiskMonths: string;
}

export interface VillageFloodData extends Village {
  currentDischarge: number;
  forecastedDischarge: number;
  daysAboveThreshold: number;
  alertLevel: AlertLevel;
  dischargeHistory: number[];
  dischargeForecast: number[];
  timestamps: Date[];
}

export type AlertLevel = "normal" | "warning" | "critical";

export interface AlertThresholds {
  warning: number;
  critical: number;
}

export interface DashboardMetrics {
  villagesMonitored: number;
  atRiskCount: number;
  populationAffected: number;
  avgDischarge: number;
}
