import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api/ApiClient';
import { endpoints } from '../../utils/api/Endpoints';
import { config } from '../../utils/config/config';

test.describe('WeatherStack API - Autocomplete Partial Name', () => {
    let api: ApiClient;

    test.beforeAll(async () => {
        api = new ApiClient(config.apiBaseUrl);
        await api.init();
    });

    test('GET autocomplete for partial query "New Y"', async () => {
        const params = {
            access_key: config.accessKey,
            query: 'New Y',
        };

        const response = await api.get(endpoints.weather.autocomplete, params);
        const data = await response.json();

        expect(data.request.query).toBe('New Y');
        expect(data.results).toBeDefined();
        expect(Array.isArray(data.results)).toBeTruthy();
        expect(data.results.length).toBeGreaterThan(0);

        console.log(`Found ${data.results.length} results for partial query "${params.query}"`);
        console.log(`First result: ${data.results[0].name}, ${data.results[0].country}`);
    });

    test.afterAll(async () => {
        await api.close();
    });
});

