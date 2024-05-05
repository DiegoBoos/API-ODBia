import { Client } from 'pg';
import { AppDS } from './data.source';

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

    const services = await client.query(
        `SELECT 1 FROM business.services`
    );
    console.log(services);
    

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
    

    console.log(`Seed process successfully.`);
    
    await client.end();
}

initialize().catch(console.error);