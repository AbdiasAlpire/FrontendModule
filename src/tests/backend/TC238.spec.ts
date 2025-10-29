import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api/ApiClient';
import { endpoints } from '../../utils/api/Endpoints';
import { config } from '../../utils/config/config';

test.describe('WeatherStack API - Historical Time Series Invalid Dates', () => {
    let api: ApiClient;

    test.beforeAll(async () => {
        api = new ApiClient(config.apiBaseUrl);
        await api.init();
    });

    test('GET historical time series with invalid date range', async () => {
        const params = {
            access_key: config.accessKey,
            query: 'London',
            historical_date_start: 'invalid-date',
            historical_date_end: 'invalid-date',
        };

        const response = await api.get(endpoints.weather.historical, params);
        const data = await response.json();

        expect(response.status()).toBe(400);
        expect(data.error).toBeDefined();

        console.log(`Status: ${response.status()}`);
        console.log(`Error code: ${data.error.code}`);
        console.log(`Error info: ${data.error.info}`);
    });

    test.afterAll(async () => {
        await api.close();
    });
});

