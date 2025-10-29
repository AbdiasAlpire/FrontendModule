import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api/ApiClient';
import { endpoints } from '../../utils/api/Endpoints';
import { config } from '../../utils/config/config';

test.describe('WeatherStack API - Historical Time Series', () => {
    let api: ApiClient;

    test.beforeAll(async () => {
        api = new ApiClient(config.apiBaseUrl);
        await api.init();
    });

    test('GET historical time series for New York with valid date range', async () => {
        const params = {
            access_key: config.accessKey,
            query: 'New York',
            historical_date_start: '2015-01-21',
            historical_date_end: '2015-01-25',
        };

        const response = await api.get(endpoints.weather.historical, params);
        const data = await response.json();

        expect(response.status()).toBe(200);
        expect(data).toHaveProperty('location');
        expect(data.location.name).toBe('New York');
        expect(data).toHaveProperty('historical');
        expect(typeof data.historical).toBe('object');

        console.log(`Historical time series for ${data.location.name}, ${data.location.region}`);
        console.log(`Date range: ${params.historical_date_start} to ${params.historical_date_end}`);
    });

    test.afterAll(async () => {
        await api.close();
    });
});

