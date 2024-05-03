import { DataSource, DataSourceOptions } from 'typeorm';

export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  // synchronize: true,
  synchronize: process.env.NODE_ENV !== 'production',
};

export const AppDS = new DataSource(DataSourceConfig);
