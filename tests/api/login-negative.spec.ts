import { test, expect } from '@playwright/test';
import { apiTestData } from '../../data/api-test-data';
import { createSandbox } from '../../helpers/api';
import { apiEndpoints } from '../../config/api-endpoints';


test('API rejects login with an incorrect password', async ({ request }) => {
    
    const sandbox = await createSandbox(request);

    // const data = await response.json();
    // const apiKey = data.apiKey;

    const loginResponse = await request.post(
        apiEndpoints.login,
        {
            headers: {
                'X-Sandbox-Key': sandbox.apiKey,
            },
            data: {
                email: sandbox.demoUser.email,
                password: apiTestData.invalidPassword,
            },
        }
    );

    const loginData = await loginResponse.json();

    expect(loginResponse.status()).toBe(401);
    expect(loginData.error.code).toBe('UNAUTHORIZED');
    expect(loginData.error.message).toBe('E-posta veya parola hatalı');
});

test('API rejects login with an incorrect email', async ({ request }) => {
    const sandbox = await createSandbox(request);

    const loginResponse = await request.post(
        apiEndpoints.login,
        {
            headers: {
                'X-Sandbox-Key': sandbox.apiKey,
            },
            data: {
                email: apiTestData.invalidEmail,
                password: sandbox.demoUser.password,
            },
        }
    );

    const loginData = await loginResponse.json();

    expect(loginResponse.status()).toBe(401);
    expect(loginData.error.code).toBe('UNAUTHORIZED');
    expect(loginData.error.message).toBe('E-posta veya parola hatalı');
});

test('API rejects login with an empty email', async ({ request }) => {
    const sandbox = await createSandbox(request);

    const loginResponse = await request.post(
        apiEndpoints.login,
        {
            headers: {
                'X-Sandbox-Key': sandbox.apiKey,
            },
            data: {
                email: apiTestData.emptyEverything,
                password: sandbox.demoUser.password,
            },
        }
    );
    const loginData = await loginResponse.json();
    //console.log(loginData);

    expect(loginData.error.code).toBe('BAD_REQUEST');
    expect(loginData.error.message).toBe('email ve password zorunlu');
    expect(loginData.error.details.missing).toContain('email');
    expect(loginResponse.status()).toBe(400);
});

test('API rejects login with an empty password', async ({ request }) => {
    const sandbox = await createSandbox(request);

    const loginResponse = await request.post(
        apiEndpoints.login,
        {
            headers: {
                'X-Sandbox-Key': sandbox.apiKey,
            },
            data: {
                email: sandbox.demoUser.email,
                password: apiTestData.emptyEverything,
            },
        }
    );
    const loginData = await loginResponse.json();
    //console.log(loginData);

    expect(loginData.error.code).toBe('BAD_REQUEST');
    expect(loginData.error.message).toBe('email ve password zorunlu');
    expect(loginData.error.details.missing).toContain('password');
    expect(loginResponse.status()).toBe(400);
});

test('API rejects login without a sandbox key', async ({ request }) => {
    const loginResponse = await request.post(
        apiEndpoints.login,
        {
            data: {
                email: 'demo@qashop.test',
                password: 'Password123!',
            },
        }
    );

    const loginData = await loginResponse.json();

    expect(loginResponse.status()).toBe(401);
    expect(loginData.error.code).toBe('UNAUTHORIZED');
});

test('API rejects an invalid Bearer token', async ({ request }) => {
    const sandbox = await createSandbox(request);

    const meResponse = await request.get(
        apiEndpoints.me,
        {
            headers: {
                'X-Sandbox-Key': sandbox.apiKey,
                'Authorization': 'Bearer invalid-token-123',
            },
        }
    );

    const meData = await meResponse.json();

    expect(meResponse.status()).toBe(401);
    expect(meData.error.code).toBe('UNAUTHORIZED');
});

test('API rejects a request without an Authorization header', async ({ request }) => {
    const sandbox = await createSandbox(request);

    const meResponse = await request.get(
        apiEndpoints.me,
        {
            headers: {
                'X-Sandbox-Key': sandbox.apiKey,
                // 'Authorization': 'Bearer invalid-token-123',
            },
        }
    );

    const meData = await meResponse.json();

    expect(meResponse.status()).toBe(401);
    expect(meData.error.code).toBe('UNAUTHORIZED');
});
