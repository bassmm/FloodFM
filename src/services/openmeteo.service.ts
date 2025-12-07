import { fetchWeatherApi } from "openmeteo";
import type { Village, VillageFloodData } from "../types/village.types";
import { FORECAST_DAYS, PAST_DAYS } from "../constants/thresholds";
import { getAlertLevel } from "../utils/alertLevels";
import { calculateDaysAboveThreshold } from "../utils/calculations";

export const FLOOD_API_URL = "https://flood-api.open-meteo.com/v1/flood";

export class OpenMeteoService {
  static async fetchVillageData(
    villages: Village[]
  ): Promise<VillageFloodData[]> {
    try {
      const params = {
        latitude: villages.map((v) => v.lat),
        longitude: villages.map((v) => v.lon),
        daily: "river_discharge",
        past_days: PAST_DAYS,
        forecast_days: FORECAST_DAYS,
      };

      const responses = await fetchWeatherApi(FLOOD_API_URL, params);

      return responses.map((response, index) => {
        const village = villages[index];
        const daily = response.daily()!;

        const times = this.parseTimeArray(daily);
        const discharges = Array.from(daily.variables(0)!.valuesArray()!);

        const currentDischarge =
          discharges[PAST_DAYS] || village.baselineDischarge;
        const forecastedDischarge =
          discharges[discharges.length - 1] || village.baselineDischarge;

        return {
          ...village,
          currentDischarge,
          forecastedDischarge,
          daysAboveThreshold: calculateDaysAboveThreshold(
            discharges.slice(PAST_DAYS)
          ),
          alertLevel: getAlertLevel(currentDischarge),
          dischargeHistory: discharges.slice(0, PAST_DAYS),
          dischargeForecast: discharges.slice(PAST_DAYS),
          timestamps: times,
        };
      });
    } catch (error) {
      console.error("Failed to fetch flood data:", error);
      // Return mock data as fallback
      return this.generateMockData(villages);
    }
  }

  private static parseTimeArray(daily: any): Date[] {
    const start = Number(daily.time());
    const end = Number(daily.timeEnd());
    const interval = daily.interval();

    const range = Array.from(
      { length: (end - start) / interval },
      (_, i) => start + i * interval
    );

    return range.map((t) => new Date(t * 1000));
  }

  private static generateMockData(villages: Village[]): VillageFloodData[] {
    return villages.map((village) => {
      const currentDischarge =
        village.baselineDischarge + Math.random() * 1500 - 500;
      const forecastedDischarge =
        village.baselineDischarge + Math.random() * 1200 - 400;

      const history = Array.from(
        { length: PAST_DAYS },
        () => village.baselineDischarge + Math.random() * 1000 - 500
      );

      const forecast = Array.from(
        { length: FORECAST_DAYS },
        () => village.baselineDischarge + Math.random() * 1200 - 400
      );

      const times = Array.from(
        { length: PAST_DAYS + FORECAST_DAYS },
        (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - PAST_DAYS + i);
          return date;
        }
      );

      return {
        ...village,
        currentDischarge,
        forecastedDischarge,
        daysAboveThreshold: calculateDaysAboveThreshold(forecast),
        alertLevel: getAlertLevel(currentDischarge),
        dischargeHistory: history,
        dischargeForecast: forecast,
        timestamps: times,
      };
    });
  }
}
