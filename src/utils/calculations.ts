import type {
  VillageFloodData,
  DashboardMetrics,
} from "../types/village.types";
import { ALERT_THRESHOLDS } from "../constants/thresholds";

export function calculateDaysAboveThreshold(forecasts: number[]): number {
  return forecasts.filter((d) => d >= ALERT_THRESHOLDS.warning).length;
}

export function calculateDashboardMetrics(
  data: VillageFloodData[]
): DashboardMetrics {
  const atRiskCount = data.filter((v) => v.alertLevel !== "normal").length;
  const totalPopulation = data.reduce((sum, v) => sum + v.population, 0);
  const avgDischarge =
    data.reduce((sum, v) => sum + v.currentDischarge, 0) / data.length;

  return {
    villagesMonitored: data.length,
    atRiskCount,
    populationAffected: Math.round(
      totalPopulation * (atRiskCount / data.length)
    ),
    avgDischarge,
  };
}
