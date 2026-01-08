import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskRepository } from './task.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { AiService } from './ai.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    HttpModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository, AiService],
})
export class TasksModule {}
