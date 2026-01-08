import { Module } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UsersController } from '../controller/users.controller';
import {TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { UserRepository } from "../repository/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
})
export class UsersModule {}
