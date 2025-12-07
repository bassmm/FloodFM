import { useState, useEffect, useCallback } from "react";
import { OpenMeteoService } from "../services/openmeteo.service";
import { VILLAGES } from "../constants/villages";
import { REFRESH_INTERVAL } from "../constants/thresholds";
import type { VillageFloodData } from "../types/village.types";

export const useFloodData = (refreshInterval = REFRESH_INTERVAL) => {
  const [data, setData] = useState<VillageFloodData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const floodData = await OpenMeteoService.fetchVillageData(VILLAGES);
      setData(floodData);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [fetchData, refreshInterval]);

  return {
    data,
    loading,
    error,
    lastUpdate,
    refresh: fetchData,
  };
};
