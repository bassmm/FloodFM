import type { AlertLevel } from "../types/village.types";
import { ALERT_THRESHOLDS } from "../constants/thresholds";

export function getAlertLevel(discharge: number): AlertLevel {
  if (discharge < ALERT_THRESHOLDS.warning) return "normal";
  if (discharge < ALERT_THRESHOLDS.critical) return "warning";
  return "critical";
}

export function getAlertPercentage(discharge: number): number {
  return Math.min((discharge / 4000) * 100, 100);
}

export function getAlertColor(alertLevel: AlertLevel): string {
  switch (alertLevel) {
    case "normal":
      return "#22b86d";
    case "warning":
      return "#f5a60e";
    case "critical":
      return "#c0152f";
  }
}
