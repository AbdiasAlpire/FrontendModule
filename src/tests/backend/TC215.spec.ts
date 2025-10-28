import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api/ApiClient';
import { endpoints } from '../../utils/api/Endpoints';
import { config } from '../../utils/config/config';

test.describe('WeatherStack API - Autocomplete Common Name', () => {
    let api: ApiClient;

    test.beforeAll(async () => {
        api = new ApiClient(config.apiBaseUrl);
        await api.init();
    });

    test('GET autocomplete for Paris - Multiple Results', async () => {
        const params = {
            access_key: config.accessKey,
            query: 'Paris',
        };

        const response = await api.get(endpoints.weather.autocomplete, params);
        const data = await response.json();

        expect(data.request.query).toBe('Paris');
        expect(data.results).toBeDefined();
        expect(Array.isArray(data.results)).toBeTruthy();
        expect(data.results.length).toBeGreaterThan(0);

        // Check that results have required fields
        data.results.forEach((result: any) => {
            expect(result).toHaveProperty('name');
            expect(result).toHaveProperty('country');
            expect(result).toHaveProperty('region');
        });

        console.log(`Found ${data.results.length} locations named "${params.query}"`);
        console.log(`First result: ${data.results[0].name}, ${data.results[0].region}, ${data.results[0].country}`);
    });

    test.afterAll(async () => {
        await api.close();
    });
});

