import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api/ApiClient';
import { endpoints } from '../../utils/api/endpoints';
import { config } from '../../utils/config/config';
import invalidCities from '../../utils/data/invalidCities.json';

type CityRecord = { city: string };

test.describe('WeatherStack API - Forecast', () => {
  let api: ApiClient;

  test.beforeAll(async () => {
    api = new ApiClient(config.apiBaseUrl);
    await api.init();
  });

  for (const { city } of invalidCities as CityRecord[]) {
    const titleSafe = city && city.trim().length ? city : '(empty)';

    test(`GET forecast with invalid characters: ${titleSafe}`, async () => {
      const params = {
        access_key: config.accessKey,
        query: city,
      };

    const response = await api.get(endpoints.weather.forecast, params);
    const data = await response.json();

    expect(response.status()).toBe(400);

    const expectedBody = {
      success: false,
      error: {
        code: 615,
        type: 'request_failed',
        info: 'Your API request failed. Please try again or contact support.',
      },
    };

    expect(data).toMatchObject(expectedBody);

    console.log(
      `Status code: ${response.status()} | error.code=${data.error?.code} | error.type=${data.error?.type} | error.info="${data.error?.info}"`
    );
    });
  }

  test.afterAll(async () => {
    await api.close();
  });
});
