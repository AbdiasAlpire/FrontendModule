import { test, expect } from "@playwright/test";
import { ApiClient } from "../../utils/api/ApiClient";
import { endpoints } from "../../utils/api/Endpoints";
import { config } from "../../utils/config/config";
import validation_message from "../../utils/data/ValidationMessages.json";

test.describe("WeatherStack API - Location Identifiers", () => {
  let api: ApiClient;

  test.beforeAll(async () => {
    api = new ApiClient(config.apiBaseUrl);
    await api.init();
  });

  test(`TC226 - GET error response for non-valid IP address`, async () => {
    const params = {
      access_key: config.accessKey,
      query: validation_message.current.invalid_ip.query,
    };
    const response = await api.get(endpoints.weather.current, params);
    const data = await response.json();
    expect(response.status(), "Status code").toBe(400);
    expect(data).toHaveProperty("success");
    expect(data).toHaveProperty("error");
    expect(data.success).toBe(validation_message.current.empty_query.success);
    expect(data.error.code).toBe(validation_message.current.invalid_ip.error.code);
    expect(data.error.type).toBe(validation_message.current.invalid_ip.error.type);
    expect(data.error.info).toBe(validation_message.current.invalid_ip.error.info);
  });

  test.afterAll(async () => {
    await api.close();
  });
});
