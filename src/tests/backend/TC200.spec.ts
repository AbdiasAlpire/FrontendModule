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

  test("TC200: GET current weather BY latitude and longitude", async () => {
    const params = {
      access_key: config.accessKey,
      query: "40.7831,-73.9712",
    };

    const response = await api.get(endpoints.weather.current, params);
    const data = await response.json();

    expect(data).toHaveProperty("location");
    expect(data.location.name).toBe("Cliffside Park");
    expect(data.location.country).toBe("United States of America");
    expect(data.location.region).toBe("New Jersey");
    expect(data).toHaveProperty("current");
    expect(typeof data.current.temperature).toBe("number");
  });

  test("TC201: GET current weather by city and country", async () => {
    const params = {
      access_key: config.accessKey,
      query: "Paris,France",
    };

    const response = await api.get(endpoints.weather.current, params);
    const data = await response.json();

    expect(response.status()).toBe(200);
    expect(data).toHaveProperty("location");
    expect(data.location.name).toBe("Paris");
    expect(data.location.country).toBe("France");
    expect(data).toHaveProperty("current");
    expect(typeof data.current.temperature).toBe("number");
    expect(data.current).toHaveProperty("weather_descriptions");
    expect(Array.isArray(data.current.weather_descriptions)).toBe(true);
  });

  test("TC202: GET current weather by ZIP code", async () => {
    const params = {
      access_key: config.accessKey,
      query: "10001",
    };

    const response = await api.get(endpoints.weather.current, params);
    const data = await response.json();

    expect(response.status()).toBe(200);
    expect(data).toHaveProperty("location");
    expect(data.location.name).toBe("New York");
    expect(data.location.country).toBe("USA");
    expect(data).toHaveProperty("current");
    expect(typeof data.current.temperature).toBe("number");
    expect(data.current).toHaveProperty("humidity");
    expect(typeof data.current.humidity).toBe("number");
  });

  test.afterAll(async () => {
    await api.close();
  });
});
