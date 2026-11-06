import { test, expect } from '@playwright/test';
import { apiEndpoints } from '../../config/api-endpoints';
import { apiTestData } from '../../data/api-test-data';
import { query } from '../../helpers/db';

test('Sandbox supports login and token refresh lifecycle', async ({ request }) => {

    const response = await request.post(apiEndpoints.sandbox, {
        data: {
            label: apiTestData.sandboxLabel,
        },
    });
    const data = await response.json();
    const apiKey = data.apiKey;
    //console.log(data);
    const sandboxRecords = await query(
        `SELECT
            s.id AS sandbox_id,
            s.label,
            u.email
        FROM sandbox s
        INNER JOIN users u
            ON u.sandbox_id = s.id
        WHERE s.id = $1
        AND u.email = $2`,
        [data.sandboxId, data.demoUser.email]
    );
    
    expect(sandboxRecords).toHaveLength(1);
    expect(sandboxRecords[0].label).toBe(data.label);
    expect(sandboxRecords[0].email).toBe(data.demoUser.email);

    const loginResponse = await request.post(
    apiEndpoints.login,
        {
            headers: {
                'X-Sandbox-Key': apiKey,
            },
            data: {
                email: data.demoUser.email,
                password: data.demoUser.password,
            },
        }
    );
    const loginData = await loginResponse.json();
    //console.log(loginData);

    expect(response.status()).toBe(201);
    expect(data.label).toBe(apiTestData.sandboxLabel);
    expect(data.sandboxId).toBeTruthy();
    expect(apiKey).toBeTruthy();
    expect(data).toHaveProperty('sandboxId');

    expect(loginResponse.status()).toBe(200);
    expect(loginData.token).toBeTruthy();
    expect(loginData.tokenType).toBe('Bearer');
    expect(loginData.expiresIn).toBe(3600);
    expect(loginData.user.email).toBe(data.demoUser.email);

    const refreshResponse = await request.post(
    apiEndpoints.refresh,
        {
            headers: {
                'X-Sandbox-Key': apiKey,
                'Authorization': `Bearer ${loginData.token}`,
            },
        }
    );

    const refreshData = await refreshResponse.json();
    expect(refreshResponse.status()).toBe(200);
    //console.log(refreshData);
    expect(refreshData.token).not.toBe(loginData.token);
    
    const oldTokenResponse = await request.get(
        apiEndpoints.me,
        {
            headers: {
                'X-Sandbox-Key': apiKey,
                'Authorization': `Bearer ${loginData.token}`,
            },
        }
    );
    expect(loginData.token).not.toBe(refreshData.token);
    expect(oldTokenResponse.status()).toBe(401);

    const newTokenResponse = await request.get(
        apiEndpoints.me,
        {
            headers: {
                'X-Sandbox-Key': apiKey,
                'Authorization': `Bearer ${refreshData.token}`,
            },
        }
    );
    expect(newTokenResponse.status()).toBe(200);

  


});