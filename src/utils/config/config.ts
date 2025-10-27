import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    baseUrl: process.env.BASE_URL || '',
    apiBaseUrl: process.env.API_BASE_URL || '',
    accessKey: process.env.ACCESS_KEY || '',
    userEmail: process.env.USER_EMAIL || '',
    userPassword: process.env.USER_PASSWORD || '',
};
