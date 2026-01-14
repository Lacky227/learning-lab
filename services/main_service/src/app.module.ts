import { Module } from '@nestjs/common';
import { UsersModule } from './users/module/users.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
      UsersModule,
      TasksModule,
      PrismaModule,
      ConfigModule.forRoot({
          isGlobal: true,
      }),
  ],
})
export class AppModule {}
