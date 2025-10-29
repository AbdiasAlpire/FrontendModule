import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/api/ApiClient';
import { endpoints } from '../../utils/api/Endpoints';
import { config } from '../../utils/config/config';


test.describe('WeatherStack API - Current Weather', () => {
    let api: ApiClient;

    test.beforeAll(async () => {
        api = new ApiClient(config.apiBaseUrl);
        await api.init();
    });

    test('GET current weather for New Delhi', async () => {
        const params = {
            access_key: config.accessKey,
            query: 'New Delhi',
        };

        const response = await api.get(endpoints.weather.current, params);
        const data = await response.json();

        expect(data).toHaveProperty('location');
        expect(data.location.name).toBe('New Delhi');
        expect(data).toHaveProperty('current');
        expect(typeof data.current.temperature).toBe('number');

        console.log(`Temp in ${data.location.name}: ${data.current.temperature}°C`);
    });

    test.afterAll(async () => {
        await api.close();
    });
});
