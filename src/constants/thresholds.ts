import type { AlertThresholds } from "../types/village.types";

export const ALERT_THRESHOLDS: AlertThresholds = {
  warning: 1000,
  critical: 2250,
};

export const FORECAST_DAYS = 7;
export const PAST_DAYS = 7;
export const REFRESH_INTERVAL = 21600000; // 6 hours in milliseconds
