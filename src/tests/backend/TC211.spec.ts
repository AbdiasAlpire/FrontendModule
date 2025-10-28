// TC235 – Negative: GET forecast with empty query should fail (expected)

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

  test('GET forecast with empty query', async () => {
    let errorThrown = false;

    try {
      await api.get(endpoints.weather.forecast, {
        access_key: config.accessKey,
        query: '',
      });
    } catch (error) {
      errorThrown = true;
      console.log('Expected failure: empty query caused non-OK response');
      console.log(`Error message: ${(error as Error).message}`);
    }

    expect(errorThrown).toBeTruthy();
  });

  test.afterAll(async () => {
    await api.close();
  });
});
