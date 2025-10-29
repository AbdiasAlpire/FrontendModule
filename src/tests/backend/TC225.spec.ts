import { test, expect } from "@playwright/test";
import { ApiClient } from "../../utils/api/ApiClient";
import { endpoints } from "../../utils/api/endpoints";
import { config } from "../../utils/config/config";
import fs from "fs";
import path from "path";

const dataPath = path.resolve(
  __dirname,
  "../../utils/data/historicaldata.json"
);
const jsonData = fs.readFileSync(dataPath, "utf-8");
const testData = JSON.parse(jsonData);

test.describe("WeatherStack API - Historical Weather", () => {
  let api: ApiClient;

  test.beforeAll(async () => {
    api = new ApiClient(config.apiBaseUrl);
    await api.init();
  });

  test.describe("GET Historical data using scientific, metric, and Fahrenheit units for valid city and valid date", () => {
    const units = ["s", "m", "f"];
    const testPositive = testData.filter(
      (typeTest: any) =>
        typeTest.cityStatus === "valid" && typeTest.dateStatus === "valid"
    );
    for (const dataSet of testPositive) {
      for (const unit of units) {
        test(`${dataSet.city} on ${dataSet.date} with unit=${unit}`, async () => {
          const params = {
            access_key: config.accessKey,
            query: dataSet.city,
            historical_date: dataSet.date,
            unit: unit,
          };
          const response = await api.get(endpoints.weather.historical, params);
          const data = await response.json();
          const bodyText = await response.text();
          expect(data).toHaveProperty("location");
          expect(data).toHaveProperty("historical");
          expect(data).toHaveProperty("request");
          expect(data.request.unit).toBe(unit);
          expect(response.status()).toBe(200);
          console.log(
            `city: ${dataSet.city} in: ${dataSet.date} with send unit=${unit} and response unit= ${data.request.unit}`
          );
        });
      }
    }
  });

  test.afterAll(async () => {
    await api.close();
  });
});
