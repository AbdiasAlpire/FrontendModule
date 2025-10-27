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

  test('GET forecast data for valid latitude and longitude parameters', async () => {
    const lat = 40.714;
    const lon = -74.006;
    const query = `${lat},${lon}`;

    const params = {
      access_key: config.accessKey,
      query: query,
    };

    const response = await api.get(endpoints.weather.forecast, params);

    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(data).toHaveProperty('location');
    expect(data.location).toHaveProperty('lat');
    expect(data.location).toHaveProperty('lon');
    expect(data).toHaveProperty('current');
    expect(data).toHaveProperty('forecast');

    expect(typeof data.current.temperature).toBe('number');
    expect(typeof data.location.lat).toBe('string');
    expect(typeof data.location.lon).toBe('string');

    const forecastKeys = Object.keys(data.forecast);
    const firstDayKey = forecastKeys[0];
    const firstDayData = data.forecast[firstDayKey];

    console.log(`Coordinates: ${data.location.lat}, ${data.location.lon}`);
    console.log(`Location detected: ${data.location.name}, ${data.location.country}`);
    console.log('Forecast summary:');
    console.log(`Date: ${firstDayData.date}`);
    console.log(`Min Temp: ${firstDayData.mintemp}°C`);
    console.log(`Max Temp: ${firstDayData.maxtemp}°C`);
    console.log(`Avg Temp: ${firstDayData.avgtemp}°C`);
  });

  test.afterAll(async () => {
    await api.close();
  });
});
