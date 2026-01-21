import { Module } from '@nestjs/common';
import { UsersModule } from './users/module/users.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      AuthModule,
      UsersModule,
      TasksModule,
      PrismaModule,
      ConfigModule.forRoot({
          isGlobal: true,
      }),
  ],
})
export class AppModule {}
