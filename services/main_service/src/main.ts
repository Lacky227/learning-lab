import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filter/global-exception.filter';
import { PrismaExceptionFilter } from './filter/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(
    new PrismaExceptionFilter(),
    new HttpExceptionFilter()
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
