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
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Yeni kullanıcı oluşturur' })
  @ApiBody({ type: CreateUserDto })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Tüm kullanıcıları getirir' })
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':documentId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Belirtilen kullanıcıyı getirir' })
  async findOne(@Param('documentId') documentId: string) {
    return this.usersService.findOne(documentId);
  }

  @Put(':documentId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Kullanıcıyı günceller' })
  @ApiBody({ type: UpdateUserDto })
  async update(
    @Param('documentId') documentId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(documentId, updateUserDto);
  }

  @Delete(':documentId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Kullanıcıyı siler' })
  async remove(@Param('documentId') documentId: string) {
    return this.usersService.remove(documentId);
  }
}
