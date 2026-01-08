import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { UserCreateDto } from "../dto/user-create.dto";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/add')
  addUser(@Body() dto: UserCreateDto) {
    return this.usersService.addUser(dto);
  }

  @Get('/:id')
  getUser(@Param('id') id: number) {
    return this.usersService.getUserById(id);
  }
}
