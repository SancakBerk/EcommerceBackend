import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('bearer'))
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get(':uid')
  getUser(@Param('uid') uid: string) {
    return this.userService.getUser(uid);
  }
}
