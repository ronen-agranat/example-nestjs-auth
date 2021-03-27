import * as path from 'path';
import * as dotenv from 'dotenv';

const dotenv_path = path.resolve(process.cwd(), `.db.env`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) { /* do nothing */ }

export const DatabaseConfig = {
  type: 'mysql' as any,
  driver: 'mysql',
  database: process.env.TYPEORM_DATABASE,
  port: parseInt(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  host: process.env.TYPEORM_HOST,
  synchronize: false,
  migrationsRun: false,
  entities: ["dist/**/*.entity{.ts,.js}"],
  migrations: ["dist/migrations/**/*{.ts,.js}"],
  cli: { "migrationsDir": "src/migrations" }
}

export default DatabaseConfig;