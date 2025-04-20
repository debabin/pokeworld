import 'reflect-metadata';
import 'dotenv/config'
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { RedisStore } from 'connect-redis';
// import { createClient } from 'redis';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const redisClient = createClient({ url: 'redis://localhost:6379' });
  // await redisClient.connect();

  // const redisStore = new RedisStore({
  //   client: redisClient,
  //   prefix: "poketinder:",
  // })
  app.use(cookieParser());
  app.use(
    session({
      // store: redisStore,
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, httpOnly: true, maxAge: 5000 }
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true }
    })
  );

  app.enableCors({
    origin: true,
    methods: 'GET,PUT,PATCH,POST,DELETE',
    credentials: true
  });

  app.setGlobalPrefix('/api');

  app.use('/live', (_req, res) => {
    res.json({ status: true });
  });

  const apiConfig = new DocumentBuilder().setTitle('Poketinder').setVersion('1.0').build();

  const document = SwaggerModule.createDocument(app, apiConfig);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
