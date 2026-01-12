import { Module } from '@nestjs/common';
import { UsersModule } from './users/module/users.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
      UsersModule,
      TasksModule,
      PrismaModule,
  ],
})
export class AppModule {}
