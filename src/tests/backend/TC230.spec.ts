import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api/ApiClient';
import { endpoints } from '../../utils/api/endpoints';
import { config } from '../../utils/config/config';
import zipcodes from '../../utils/data/ZipCodes.json';

test.describe('WeatherStack API - Forecast', () => {
  let api: ApiClient;

  test.beforeAll(async () => {
    api = new ApiClient(config.apiBaseUrl);
    await api.init();
  });

  for (const { zip } of zipcodes as { zip: string }[]) {
    test(`GET current weather by ZIP code: ${zip}`, async () => {
      const params = {
        access_key: config.accessKey,
        query: zip,
      };

      const response = await api.get(endpoints.weather.current, params);
      expect(response.status()).toBe(200);

      const data = await response.json();

      expect(data).toHaveProperty('location');
      expect(data).toHaveProperty('current');
      expect(typeof data.location.name).toBe('string');
      expect(typeof data.location.country).toBe('string');
      expect(typeof data.current.temperature).toBe('number');

      console.log(`ZIP: ${zip}`);
      console.log(`Detected location: ${data.location.name}, ${data.location.country}`);
      console.log(`Temperature: ${data.current.temperature}°C`);
    });
  }

  test.afterAll(async () => {
    await api.close();
  });
});
