import { ValidationPipe } from '@nestjs/common';
import { NestFactory }    from '@nestjs/core';
import session            from 'express-session';
import passport           from 'passport';
import { join }           from 'path';
import createFileStore    from 'session-file-store';
import { AppModule }      from './app/app.module';

const FileStore = createFileStore(session);

async function bootstrap() {
  const app          = await NestFactory.create(AppModule);
  // const globalPrefix = 'api';

  // app.setGlobalPrefix(globalPrefix);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.use(session({
    secret: process.env.COOKIE_SECRET!,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    store: new FileStore({
      path: join(process.cwd(), '.sessions'),
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1d
    },
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(process.env.PORT);
}

bootstrap();
