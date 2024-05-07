import { Client } from 'pg';

import * as dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

async function initialize() {

    const client = new Client({
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME, // Conecta a la base de datos predeterminada
    });

    await client.connect();

    // Services
    const services = await client.query(
        `SELECT 1 FROM business.services`
    );

    if (services.rowCount === 0) {

        await client.query(`
            INSERT INTO business.services (name, rate) VALUES
            ('text', 0.1),
            ('image', 0.2),
            ('audio', 0.3),
            ('video', 0.4);
        `);
        console.log(`Seed service successfully.`);
    }

    // Rates
    const rates = await client.query(
        `SELECT 1 FROM business.rates`
    );

    if (rates.rowCount === 0) {

        await client.query(`
            INSERT INTO business.rates (platform, model, cost_input_per_1k, cost_output_per_1k, price_input_per_1k, price_output_per_1k) VALUES
            ('openia', 'gpt-3.5-turbo', 0.0005, 0.0015, 0.002, 0.003),
            ('openia', 'gpt-4', 0.03, 0.06, 0.07, 0.13),
            ('openia', 'gpt-4-32k', 0.06, 0.12, 0.13, 0.25)
            
        `);
        console.log(`Seed rate successfully.`);
    }
    

    console.log(`Seed process successfully.`);
    
    await client.end();
}

initialize().catch(console.error);