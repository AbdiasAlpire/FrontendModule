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

  test("GET Historical data for no data", async () => {
    const params = {
      access_key: config.accessKey,
      query: "",
      historical_date: "",
    };
    const response = await api.get(endpoints.weather.historical, params);
    const data = await response.json();
    expect(response.status()).toBe(400);
    const dataBody = await response.text();
    expect(dataBody).toContain("error");
    console.log(dataBody);
  });

  test.afterAll(async () => {
    await api.close();
  });
});
