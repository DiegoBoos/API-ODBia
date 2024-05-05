import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

export const connectionSource = new DataSource({
  // migrationsTableName: 'migrations',
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
});

export async function createDatabase(databaseName: string) {
  await connectionSource.initialize();

  const res = await connectionSource.query(
    `SELECT 1 FROM pg_database WHERE datname='${databaseName}'`,
  );
  if (res.rowCount === 0) {
    await connectionSource.query(
      `CREATE DATABASE IF NOT EXISTS ${databaseName}`,
    );
  }
}
export async function createSchema(schemaName: string) {
  // Conectar y crear esquema si no existe
  await connectionSource.initialize();
  await connectionSource.query(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);
}
