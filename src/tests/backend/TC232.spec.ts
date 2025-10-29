import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api/ApiClient';
import { endpoints } from '../../utils/api/endpoints';
import { config } from '../../utils/config/config';
import languages from '../../utils/data/Languages.json';

test.describe('WeatherStack API - Forecast', () => {
  let api: ApiClient;

  test.beforeAll(async () => {
    api = new ApiClient(config.apiBaseUrl);
    await api.init();
  });

  for (const { language } of languages as { language: string }[]) {
    test(`GET /forecast with language=${language} should return 403`, async () => {
      const params = {
        access_key: config.accessKey,
        query: 'New York',
        language,
      };

      const response = await api.get(endpoints.weather.forecast, params);
      const data = await response.json();

      expect(response.status()).toBe(403);

      const expectedError = {
        success: false,
        error: {
          code: 105,
          type: 'function_access_restricted',
          info:
            'Access Restricted - Your current Subscription Plan does not support this API Function.',
        },
      };

      expect(data).toMatchObject(expectedError);

      console.log(
        `Status code: ${response.status()} (Expected: 403 Forbidden) | language=${language} | error.code=${data.error?.code} | error.type=${data.error?.type}`
      );
    });
  }

  test.afterAll(async () => {
    await api.close();
  });
});
