import { test, expect } from "@playwright/test";
import { ApiClient } from "../../utils/api/ApiClient";
import { endpoints } from "../../utils/api/endpoints";
import { config } from "../../utils/config/config";
import fs from "fs";
import path from "path";

const dataPath = path.resolve(__dirname, "../../utils/data/coords.json");
const testData = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

test.describe("WeatherStack API - Historical Weather", () => {
  let api: ApiClient;

  test.beforeAll(async () => {
    api = new ApiClient(config.apiBaseUrl);
    await api.init();
  });

  test.describe("GET Historical data using geographic coordinates", () => {
    for (const { lat, lon } of testData) {
      test(`weather for (${lat}, ${lon})`, async () => {
        const params = {
          access_key: config.accessKey,
          query: `${lat},${lon}`,
          historical_date: "2024-10-10",
        };

        const response = await api.get(endpoints.weather.historical, params);
        const status = response.status();
        expect(status).toBe(200);
        const data = await response.json();
        expect(data).toHaveProperty("location");
        expect(data).toHaveProperty("request");
        expect(data.request.type).toBe("LatLon");
        console.log(
          `Coordinates: ${lat},${lon} | Location: ${data.location.name}`
        );
      });
    }
  });

  test.afterAll(async () => {
    await api.close();
  });
});
