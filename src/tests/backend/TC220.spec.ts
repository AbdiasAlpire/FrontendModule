import { test, expect } from "@playwright/test";
import { ApiClient } from "../../utils/api/ApiClient";
import { endpoints } from "../../utils/api/Endpoints";
import { config } from "../../utils/config/config";
import locations from "../../utils/data/CurrentLocationCountry.json";

test.describe("WeatherStack API - Location Identifiers", () => {
  let api: ApiClient;

  test.beforeAll(async () => {
    api = new ApiClient(config.apiBaseUrl);
    await api.init();
  });

  for (const loc of locations) {
    test(`TC220 - GET current weather response in scientific units for ${loc.name}`, async () => {
      const params_cientific_unit = {
        access_key: config.accessKey,
        query: loc.name,
        units: "s"
      };
      const params_metric_unit = {
        access_key: config.accessKey,
        query: loc.name,
      };
      const response_cientific_unit = await api.get(endpoints.weather.current, params_cientific_unit);
      const data_cientific_unit = await response_cientific_unit.json();
      const response_metric_unit = await api.get(endpoints.weather.current, params_metric_unit);
      const data_metric_unit = await response_metric_unit.json();
      expect(response_cientific_unit.status(), "Status code").toBe(200);
      expect(data_cientific_unit).toHaveProperty("current");
      expect(data_cientific_unit.current).toHaveProperty("temperature");
      expect(data_cientific_unit.current.temperature).toBeCloseTo((data_metric_unit.current.temperature+273.15),0);
      expect(data_cientific_unit.location.country).toBe(loc.country);
    });
  }

  test.afterAll(async () => {
    await api.close();
  });
});
