import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   //Uso de pipes de Forma global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades no definidas en el DTO
  }))
  await app.listen(process.env.PORT ?? 3000);

 
}
bootstrap();

//mysql
//! npm i mysql2
//! npm i @types/mysql -D

//Postgres
//npm i pg
//npm i @types/pg -D

//26-feb-26
// git commit -a -m "fix:conexion a base de datos (mysql y postgres ) con uso de providers"