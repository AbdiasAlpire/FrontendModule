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

  test('GET forecast data for a valid city name', async () => {
    const city = 'New York';
    const params = {
      access_key: config.accessKey,
      query: city,
    };

    const response = await api.get(endpoints.weather.forecast, params);

    expect(response.status()).toBe(200);

    const data = await response.json();

    expect(data).toHaveProperty('location');
    expect(data.location.name).toBe(city);
    expect(data).toHaveProperty('current');
    expect(typeof data.current.temperature).toBe('number');
    expect(data).toHaveProperty('forecast');

    const forecastKeys = Object.keys(data.forecast);
    const firstDayKey = forecastKeys[0];
    const firstDayData = data.forecast[firstDayKey];

    console.log(`Location: ${data.location.name}, ${data.location.country}`);
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
