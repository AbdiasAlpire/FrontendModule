import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api/ApiClient';
import { endpoints } from '../../utils/api/endpoints';
import { config } from '../../utils/config/config';

test.describe('WeatherStack API - Forecast', () => {
  let api: ApiClient;

  test.beforeAll(async () => {
    api = new ApiClient(config.apiBaseUrl);
    await api.init();
  });

  test('GET forecast only blank spaces query should return 400 Bad Request', async () => {
    const params = {
      access_key: config.accessKey,
      query: '      ',
    };

    const response = await api.get(endpoints.weather.forecast, params);

    expect(response.status()).toBe(400);

    console.log(`Status code: ${response.status()} (Expected: 400 Bad Request)`);
  });

  test.afterAll(async () => {
    await api.close();
  });
});