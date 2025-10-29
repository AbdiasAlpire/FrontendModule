import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api/ApiClient';
import { endpoints } from '../../utils/api/Endpoints';
import { config } from '../../utils/config/config';
import fs from 'fs';
import path from 'path';

const csvPath = path.resolve(__dirname, '../../utils/data/AutocompleteCities.csv');
const csvData = fs.readFileSync(csvPath, 'utf-8');
const lines = csvData.split('\n').slice(1);

const cities = lines
    .filter(line => line.trim() !== '')
    .map(line => {
        const [city, country] = line.split(',');
        return { city: city.trim(), country: country.trim() };
    });

test.describe('WeatherStack API - Autocomplete Cities from CSV', () => {
    let api: ApiClient;

    test.beforeAll(async () => {
        api = new ApiClient(config.apiBaseUrl);
        await api.init();
    });

    for (const cityData of cities) {
        test(`GET autocomplete for ${cityData.city}`, async () => {
            const params = {
                access_key: config.accessKey,
                query: cityData.city,
            };

            const response = await api.get(endpoints.weather.autocomplete, params);
            const data = await response.json();

            expect(data.request.query).toBe(cityData.city);
            expect(data.results).toBeDefined();
            expect(Array.isArray(data.results)).toBeTruthy();
            expect(data.results.length).toBeGreaterThan(0);

            console.log(`Found ${data.results.length} results for "${cityData.city}"`);
            console.log(`First result: ${data.results[0].name}, ${data.results[0].country}`);
        });
    }

    test.afterAll(async () => {
        await api.close();
    });
});

