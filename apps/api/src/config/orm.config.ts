import { LoadStrategy, PopulateHint } from '@mikro-orm/core';
import { MikroOrmModuleSyncOptions }  from '@mikro-orm/nestjs/typings';
import { SqlHighlighter }             from '@mikro-orm/sql-highlighter';
import { Logger }                     from '@nestjs/common';
import dotenv                         from 'dotenv';
import path                           from 'path';
import { User }                       from '../app/user/models/user.entity';

console.log('[mikro-orm.config] - ENV', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  const dockerEnvPath = path.resolve(process.cwd() + `/.env.development`);
  dotenv.config({
    path: dockerEnvPath
  });
}

const logger = new Logger('MikroOrm');

let config: MikroOrmModuleSyncOptions = {
  type: 'postgresql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  debug: Boolean(process.env.DB_DEBUG),
  entities: [
    User,
  ],
  discovery: {
    disableDynamicFileAccess: true
  },
  loadStrategy: LoadStrategy.JOINED,
  populateWhere: PopulateHint.INFER,
  highlighter: new SqlHighlighter(),
  tsNode: true,
  migrations: {
    path: __dirname + '/migrations',
    pathTs: __dirname + '/migrations',
    disableForeignKeys: false
  },
  allowGlobalContext: true,
  logger: msg => logger.log(msg)
};

if (process.env.NODE_ENV === 'production') {
  config = {
    ...config,
    driverOptions: {
      connection: { ssl: { rejectUnauthorized: false } },
    }
  };
}

export default config;

