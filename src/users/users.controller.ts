import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':documentId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('documentId') documentId: string) {
    return this.usersService.findOne(documentId);
  }

  @Put(':documentId')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('documentId') documentId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(documentId, updateUserDto);
  }

  @Delete(':documentId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('documentId') documentId: string) {
    return this.usersService.remove(documentId);
  }
}
