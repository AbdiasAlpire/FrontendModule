import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api/ApiClient';
import { endpoints } from '../../utils/api/Endpoints';
import { config } from '../../utils/config/config';

test.describe('WeatherStack API - Autocomplete Full City Name', () => {
    let api: ApiClient;

    test.beforeAll(async () => {
        api = new ApiClient(config.apiBaseUrl);
        await api.init();
    });

    test('GET autocomplete for London', async () => {
        const params = {
            access_key: config.accessKey,
            query: 'London',
        };

        const response = await api.get(endpoints.weather.autocomplete, params);
        const data = await response.json();

        expect(data.request.query).toBe('London');
        expect(data.results).toBeDefined();
        expect(Array.isArray(data.results)).toBeTruthy();
        expect(data.results.length).toBeGreaterThan(0);
        expect(data.results[0]).toHaveProperty('name');
        expect(data.results[0]).toHaveProperty('country');

        console.log(`Found ${data.results.length} results for "${params.query}"`);
    });

    test.afterAll(async () => {
        await api.close();
    });
});

