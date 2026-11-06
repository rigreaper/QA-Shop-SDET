import { test, expect } from '@playwright/test';
import { query } from '../../helpers/db';

test('should connect to PostgreSQL and retrieve database name', async () => {
    const result = await query(
        'SELECT current_database() AS database_name'
    );

    expect(result[0].database_name).toBe('qashop');
    console.log('Connected to PostgreSQL database:', result[0].database_name);
});

test('should retrieve a product using a parameterized query', async () => {
    const products = await query(
        'SELECT sku, name, price FROM products WHERE sku = $1 LIMIT 1',
        ['SKU-0001']
    );

    expect(products).toHaveLength(1);
    expect(products[0].sku).toBe('SKU-0001');
    expect(Number(products[0].price)).toBeGreaterThan(0);
});