import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api/ApiClient';
import { endpoints } from '../../utils/api/endpoints';
import { config } from '../../utils/config/config';
import coords from '../../utils/data/coords.json';

test.describe('WeatherStack API - Forecast', () => {
  let api: ApiClient;

  test.beforeAll(async () => {
    api = new ApiClient(config.apiBaseUrl);
    await api.init();
  });

  for (const { lat, lon } of coords) {
    test(`GET forecast data for valid latitude/longitude: ${lat},${lon}`, async () => {
      const query = `${lat},${lon}`;
      const params = {
        access_key: config.accessKey,
        query,
      };

      const response = await api.get(endpoints.weather.forecast, params);
      expect(response.status()).toBe(200);

      const data = await response.json();

      expect(data).toHaveProperty('location');
      expect(data.location).toHaveProperty('lat');
      expect(data.location).toHaveProperty('lon');
      expect(data).toHaveProperty('current');
      expect(data).toHaveProperty('forecast');

      const forecastKeys = Object.keys(data.forecast || {});
      const firstDay = data.forecast[forecastKeys[0]];

      console.log(`Coordinates requested: ${lat},${lon}`);
      console.log(`Detected: ${data.location.name}, ${data.location.country}`);
      console.log(`Date: ${firstDay.date} | Min: ${firstDay.mintemp}°C | Max: ${firstDay.maxtemp}°C`);
    });
  }

  test.afterAll(async () => {
    await api.close();
  });
});
