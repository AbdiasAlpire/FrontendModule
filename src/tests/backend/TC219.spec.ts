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
    test(`TC219 - GET current weather response in imperial units for ${loc.name}`, async () => {
      const params_imperial_unit = {
        access_key: config.accessKey,
        query: loc.name,
        units: "f"
      };
      const params_metric_unit = {
        access_key: config.accessKey,
        query: loc.name,
      };
      const response_imperial_unit = await api.get(endpoints.weather.current, params_imperial_unit);
      const data_imperial_unit = await response_imperial_unit.json();
      const response_metric_unit = await api.get(endpoints.weather.current, params_metric_unit);
      const data_metric_unit = await response_metric_unit.json();
      expect(response_imperial_unit.status(), "Status code").toBe(200);
      expect(data_imperial_unit).toHaveProperty("current");
      expect(data_imperial_unit.current).toHaveProperty("temperature");
      expect(data_imperial_unit.current.temperature).toBeCloseTo(((data_metric_unit.current.temperature*9)/ 5 + 32),0);
      expect(data_imperial_unit.location.country).toBe(loc.country);
    });
  }

  test.afterAll(async () => {
    await api.close();
  });
});
