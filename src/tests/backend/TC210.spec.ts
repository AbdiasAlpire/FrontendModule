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

    test(`GET forecast with special characters: ${titleSafe}`, async () => {
      let errorThrown = false;

      try {
        await api.get(endpoints.weather.forecast, {
          access_key: config.accessKey,
          query: city,
        });
      } catch (err) {
        errorThrown = true;
        console.log(`Expected failure for city="${titleSafe}": non-OK response captured`);
      }

      expect(errorThrown).toBeTruthy();
    });
  }

  test.afterAll(async () => {
    await api.close();
  });
});
