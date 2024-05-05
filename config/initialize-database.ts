import { Client } from 'pg';

import * as dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

async function initialize() {

     // Create Database

    const client = new Client({
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'postgres', // Conecta a la base de datos predeterminada
    });

    await client.connect();
    const res = await client.query(
        `SELECT 1 FROM pg_database WHERE datname = '${process.env.DB_NAME}'`
    );

    if (res.rowCount === 0) {
        await client.query(`CREATE DATABASE ${process.env.DB_NAME}`);
        console.log(`Database ${process.env.DB_NAME} created successfully.`);
    } else {
        console.log(`Database ${process.env.DB_NAME} already exists.`);
    }
    client.database = process.env.DB_NAME;
    
    await client.end();
    
    
    // Create Schemas
    
    const clientDB = new Client({
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME, // Conecta a la base de datos predeterminada
    });
    await clientDB.connect();
    
    await clientDB.query(`CREATE SCHEMA IF NOT EXISTS auth`);
    await clientDB.query(`CREATE SCHEMA IF NOT EXISTS business`);
    
    console.log(`Schemas process successfully.`);
    
    await clientDB.end();
}


initialize().catch(console.error);
