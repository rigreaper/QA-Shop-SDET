import 'dotenv/config';
import { Pool } from 'pg';

export const db = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

export async function query(
    sql: string,
    params: (string | number | boolean | null)[] = []
) {
    const result = await db.query(sql, params);

    return result.rows;
}