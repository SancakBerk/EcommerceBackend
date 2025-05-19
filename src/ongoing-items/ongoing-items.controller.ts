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
import { OngoingItemsService } from './ongoing-items.service';
import {
  CreateOngoingItemDto,
  UpdateOngoingItemDto,
} from '../dto/ongoingItem.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('ongoing-items')
export class OngoingItemsController {
  constructor(private readonly ongoingItemsService: OngoingItemsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createOngoingItemDto: CreateOngoingItemDto) {
    return this.ongoingItemsService.create(createOngoingItemDto);
  }

  @Get()
  async findAll() {
    return this.ongoingItemsService.findAll();
  }

  @Get(':documentId')
  async findOne(@Param('documentId') documentId: string) {
    return this.ongoingItemsService.findOne(documentId);
  }

  @Put(':documentId')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('documentId') documentId: string,
    @Body() updateOngoingItemDto: UpdateOngoingItemDto,
  ) {
    return this.ongoingItemsService.update(documentId, updateOngoingItemDto);
  }

  @Delete(':documentId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('documentId') documentId: string) {
    return this.ongoingItemsService.remove(documentId);
  }
}
