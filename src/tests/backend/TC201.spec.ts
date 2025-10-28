import { test, expect } from "@playwright/test";
import { ApiClient } from "../../utils/api/ApiClient";
import { endpoints } from "../../utils/api/endpoints";
import { config } from "../../utils/config/config";
import locations from "../../utils/data/CurrentLocationCountry.json";

test.describe("WeatherStack API - Location Identifiers", () => {
  let api: ApiClient;

  test.beforeAll(async () => {
    api = new ApiClient(config.apiBaseUrl);
    await api.init();
  });

  for (const loc of locations) {
    test(`TC201 - GET current weather by city and country for ${loc.name}, ${loc.country}`, async () => {
      const params = {
        access_key: config.accessKey,
        query: `${loc.name},${loc.country}`,
      };
      const response = await api.get(endpoints.weather.current, params);
      const data = await response.json();
      expect(response.status(), "Status code").toBe(200);
      expect(data).toHaveProperty("location");
      expect(data).toHaveProperty("current");
      expect(data.location.country).toBe(loc.country);
      expect(data.location.timezone_id).toBe(loc.timezone_id);
    });
  }

  test.afterAll(async () => {
    await api.close();
  });
});
