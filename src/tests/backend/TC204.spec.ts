import { test, expect } from "@playwright/test";
import { ApiClient } from "../../utils/api/ApiClient";
import { endpoints } from "../../utils/api/endpoints";
import { config } from "../../utils/config/config";
import fs from "fs";
import path from "path";

const dataPath = path.resolve(__dirname, "../../utils/data/weatherDDT.json");
const jsonData = fs.readFileSync(dataPath, "utf-8");
const testData = JSON.parse(jsonData);

test.describe("WeatherStack API - Historical Weather", () => {
  let api: ApiClient;

  test.beforeAll(async () => {
    api = new ApiClient(config.apiBaseUrl);
    await api.init();
  });

  test.describe("GET Historical data for a valid city and valid date ", () => {
    const testPositive = testData.filter(
      (typeTest: any) => typeTest.type === "valid, valid"
    );

    for (const dataSet of testPositive) {
      test(`${dataSet.city} on ${dataSet.date}`, async () => {
        const params = {
          access_key: config.accessKey,
          query: dataSet.city,
          historical_date: dataSet.date,
        };
        const response = await api.get(endpoints.weather.historical, params);
        expect(response.ok()).toBeTruthy();
        const data = await response.json();
        expect(data).toHaveProperty("location");
        expect(data.location.name.toLowerCase()).toContain(
          dataSet.city.toLowerCase()
        );
        expect(data).toHaveProperty("historical");
        expect(response.status()).toBe(200);
        console.log(data);
      });
    }
  });
});
