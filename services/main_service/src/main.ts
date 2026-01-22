import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/global-exception.filter';
import { PrismaExceptionFilter } from './filter/prisma-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new HttpExceptionFilter()
  );

  const config = new DocumentBuilder()
    .setTitle('Learning Lab Main Service')
    .setDescription(
      'Main service API for Learning Lab. ' +
      'Provides endpoints for user management (authentication with JWT, creation, retrieval, deletion) ' +
      'and task management (CRUD operations). ' +
      'Task creation integrates with AI Service to automatically determine task priority and category based on description.'
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
