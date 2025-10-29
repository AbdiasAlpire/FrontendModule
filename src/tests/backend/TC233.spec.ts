import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api/ApiClient';
import { endpoints } from '../../utils/api/Endpoints';
import { config } from '../../utils/config/config';

test.describe('WeatherStack API - Autocomplete ZIP Code', () => {
    let api: ApiClient;

    test.beforeAll(async () => {
        api = new ApiClient(config.apiBaseUrl);
        await api.init();
    });

    test('GET autocomplete for ZIP code 90210', async () => {
        const params = {
            access_key: config.accessKey,
            query: '90210',
        };

        const response = await api.get(endpoints.weather.autocomplete, params);
        const data = await response.json();

        expect(data.request.query).toBe('90210');
        expect(data.results).toBeDefined();
        expect(Array.isArray(data.results)).toBeTruthy();
        expect(data.results.length).toBeGreaterThan(0);
        expect(data.results[0]).toHaveProperty('name');
        expect(data.results[0]).toHaveProperty('country');

        console.log(`Found ${data.results.length} results for ZIP code "${params.query}"`);
        console.log(`First result: ${data.results[0].name}, ${data.results[0].region}, ${data.results[0].country}`);
    });

    test.afterAll(async () => {
        await api.close();
    });
});

