import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env' })

export const dataSourceOptions : DataSourceOptions = {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DB_NAME,
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
        migrations: ['dist/db/migrations/*.js'],

};

export const dataSource = new DataSource(dataSourceOptions);