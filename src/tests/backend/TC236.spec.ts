import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api/ApiClient';
import { endpoints } from '../../utils/api/Endpoints';
import { config } from '../../utils/config/config';

test.describe('WeatherStack API - Autocomplete Invalid Characters', () => {
    let api: ApiClient;

    test.beforeAll(async () => {
        api = new ApiClient(config.apiBaseUrl);
        await api.init();
    });

    test('GET autocomplete with special characters only', async () => {
        const params = {
            access_key: config.accessKey,
            query: '@#$%^&*',
        };

        const response = await api.get(endpoints.weather.autocomplete, params);
        const data = await response.json();

        expect(response.status()).toBe(400);
        expect(data.error).toBeDefined();

        console.log(`Status: ${response.status()}`);
        console.log(`Error code: ${data.error.code}`);
    });

    test.afterAll(async () => {
        await api.close();
    });
});

