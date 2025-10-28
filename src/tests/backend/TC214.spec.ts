import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api/ApiClient';
import { endpoints } from '../../utils/api/Endpoints';
import { config } from '../../utils/config/config';

test.describe('WeatherStack API - Autocomplete Country Name', () => {
    let api: ApiClient;

    test.beforeAll(async () => {
        api = new ApiClient(config.apiBaseUrl);
        await api.init();
    });

    test('GET autocomplete for France', async () => {
        const params = {
            access_key: config.accessKey,
            query: 'France',
        };

        const response = await api.get(endpoints.weather.autocomplete, params);
        const data = await response.json();

        expect(data.request.query).toBe('France');
        expect(data.results).toBeDefined();
        expect(Array.isArray(data.results)).toBeTruthy();
        expect(data.results.length).toBeGreaterThan(0);

        const hasFranceResult = data.results.some((result: any) => 
            result.country && result.country.toLowerCase().includes('france')
        );
        expect(hasFranceResult).toBeTruthy();

        console.log(`Found ${data.results.length} results for "${params.query}"`);
    });

    test.afterAll(async () => {
        await api.close();
    });
});

