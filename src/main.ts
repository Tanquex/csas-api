import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   //Uso de pipes de Forma global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades no definidas en el DTO
  }));

  //COnfiguracion de swagger
  const config = new DocumentBuilder()
    .setTitle('CSAS APi')
    .setDescription('Documentacion d ela api para pruebas')
    .setVersion('1.0.0')
    .build();

    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('api/docs',app,document);

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

//? swagger
//npm i @nestjs/swagger

//2 de marzo
//git commit -a -m "fix:CRUD funcional con bases de datos y configuracion de swwager"

//5 marzo 
// git commit -a -m "fix:uso de prisma y correcion de tareas 