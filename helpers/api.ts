import { type APIRequestContext } from '@playwright/test';
import { apiTestData } from '../data/api-test-data';
import { apiEndpoints } from '../config/api-endpoints';

export async function createSandbox(request: APIRequestContext) {
    const response = await request.post(apiEndpoints.sandbox, {
        data: {
            label: apiTestData.sandboxLabel,
        },
    });

    const data = await response.json();

    return {
        apiKey: data.apiKey,
        demoUser: data.demoUser,
    };
}