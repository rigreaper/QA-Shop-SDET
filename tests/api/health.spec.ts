import { test, expect } from '@playwright/test';

test('API health check', async ({ request }) => {

    const response = await request.get('http://localhost:4000/health');
    const data = await response.json();
    const databaseData = data.database;
    //console.log(data);



    
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');
    expect(data.status).toBe('ok');
    expect(databaseData).toBe("up");
    expect(typeof data.uptimeSeconds).toBe('number');
    expect(data.uptimeSeconds).toBeGreaterThan(0);
    expect(data).toHaveProperty('database');
    expect(typeof data.time).toBe('string');

});