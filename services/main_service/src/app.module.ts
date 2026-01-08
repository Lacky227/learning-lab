import { Module } from '@nestjs/common';
import { UsersModule } from './users/module/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
      UsersModule,
      TasksModule,
      ConfigModule.forRoot({
        isGlobal: true,
      }),

      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: 'postgres',
          port: 5432,
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          autoLoadEntities: true,
          synchronize: true,
        }),
      }),
  ],
})
export class AppModule {}
