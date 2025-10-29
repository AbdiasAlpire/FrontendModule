import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api/ApiClient';
import { endpoints } from '../../utils/api/endpoints';
import { config } from '../../utils/config/config';
import ipAddresses from '../../utils/data/IpAddresses.json';

test.describe('WeatherStack API - Forecast', () => {
  let api: ApiClient;

  test.beforeAll(async () => {
    api = new ApiClient(config.apiBaseUrl);
    await api.init();
  });

  for (const { ip } of ipAddresses as { ip: string }[]) {
    test(`GET current weather by IP address: ${ip}`, async () => {
      const params = {
        access_key: config.accessKey,
        query: ip,
      };

      const response = await api.get(endpoints.weather.current, params);
      expect(response.status()).toBe(200);

      const data = await response.json();

      expect(data).toHaveProperty('location');
      expect(data).toHaveProperty('current');

      expect(data.location).toHaveProperty('name');
      expect(data.location).toHaveProperty('country');
      expect(typeof data.current.temperature).toBe('number');

      console.log(
        `IP: ${ip} | Detected: ${data.location.name}, ${data.location.country} | Temp: ${data.current.temperature}°C`
      );
    });
  }

  test.afterAll(async () => {
    await api.close();
  });
});
