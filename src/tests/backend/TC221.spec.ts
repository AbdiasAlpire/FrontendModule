import { test, expect } from "@playwright/test";
import { ApiClient } from "../../utils/api/ApiClient";
import { endpoints } from "../../utils/api/endpoints";
import { config } from "../../utils/config/config";

test.describe("WeatherStack API - Forecast", () => {
  let api: ApiClient;

  test.beforeAll(async () => {
    api = new ApiClient(config.apiBaseUrl);
    await api.init();
  });

  test("GET Historical data for an invalid access_key", async () => {
    const params = {
      access_key: "44ec39820e908d577b23f7b48dd0588d",
      query: "New York",
      historical_date: "2014-10-10",
    };

    const response = await api.get(endpoints.weather.forecast, params);
    expect(response.status()).toBe(401);
    const bodyText = await response.text();
    expect(bodyText).toContain("invalid_access_key");
    console.log(
      `Status code: ${response.status()} (Expected: 401 Bad Request), ${bodyText}`
    );
  });

  test.afterAll(async () => {
    await api.close();
  });
});
