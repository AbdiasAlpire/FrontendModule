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

  test('GET forecast only blank spaces query returns 400 and expected reponse body', async () => {
    const params = {
      access_key: config.accessKey,
      query: '      ',
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

  test.afterAll(async () => {
    await api.close();
  });
});
