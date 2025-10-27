import { test, expect } from "@playwright/test";
import { ApiClient } from "../../utils/api/ApiClient";
import { endpoints } from "../../utils/api/endpoints";
import { config } from "../../utils/config/config";

test.describe("WeatherStack API - Location Identifiers", () => {
  let api: ApiClient;

  test.beforeAll(async () => {
    api = new ApiClient(config.apiBaseUrl);
    await api.init();
  });

  test("GET current weather for latitude and longitude", async () => {
    const params = {
      access_key: config.accessKey,
      query: "40.7831,-73.9712",
    };

    const response = await api.get(endpoints.weather.current, params);
    const data = await response.json();

    expect(data).toHaveProperty("location");
    expect(data.location.name).toBe("Guttenberg");
    expect(data.location.country).toBe("United States of America");
    expect(data.location.region).toBe("New Jersey");
    expect(data).toHaveProperty("current");
    expect(typeof data.current.temperature).toBe("number");

    console.log(`Temp in ${data.location.name}: ${data.current.temperature}°C`);
  });

  test.afterAll(async () => {
    await api.close();
  });
});
