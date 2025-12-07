import { useState, useMemo } from "react";
import type { VillageFloodData, AlertLevel } from "../types/village.types";

export const useFilters = (data: VillageFloodData[]) => {
  const [provinceFilter, setProvinceFilter] = useState<string>("");
  const [alertFilter, setAlertFilter] = useState<AlertLevel | "">("");

  const filteredData = useMemo(() => {
    return data.filter((village) => {
      const provinceMatch =
        !provinceFilter || village.province === provinceFilter;
      const alertMatch = !alertFilter || village.alertLevel === alertFilter;
      return provinceMatch && alertMatch;
    });
  }, [data, provinceFilter, alertFilter]);

  return {
    provinceFilter,
    setProvinceFilter,
    alertFilter,
    setAlertFilter,
    filteredData,
  };
};
