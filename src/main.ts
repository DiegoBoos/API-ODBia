import * as express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

import * as session from 'express-session';
import * as passport from 'passport';


import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as morgan from 'morgan';
import * as timeout from 'connect-timeout';

import { AppModule } from './app.module';

import { CORS } from './constants';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });

  app.use(morgan('dev'));

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());


  app.use(express.json({ limit: '100mb' }));
  app.use(express.urlencoded({ extended: true, limit: '2000mb' }));
  app.use(timeout(process.env.TIMEOUT));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.enableCors(CORS);

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.setGlobalPrefix('api');

  //Swaager

  const config = new DocumentBuilder()
    .setTitle('API REST - ODB')
    .setDescription('API REST ODB')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const swaggerUiOptions = {
    swaggerOptions: {
      filter: true,
      tagsSorter: 'alpha',
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, swaggerUiOptions);

  await app.listen(process.env.PORT);

  logger.log(`App running on port ${process.env.PORT}`);
  logger.log(`Ultima Actualización: "1 may 2024"`);
  
}
bootstrap();
