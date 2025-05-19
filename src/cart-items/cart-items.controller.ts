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
import { CartItemsService } from './cart-items.service';
import { CreateCartItemDto, UpdateCartItemDto } from '../dto/cartItem.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart-items')
export class CartItemsController {
  constructor(private readonly cartItemsService: CartItemsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCartItemDto: CreateCartItemDto) {
    return this.cartItemsService.create(createCartItemDto);
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async findByUser(@Param('userId') userId: string) {
    return this.cartItemsService.findByUser(Number(userId));
  }

  @Get(':documentId')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('documentId') documentId: string) {
    return this.cartItemsService.findOne(documentId);
  }

  @Put(':documentId')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('documentId') documentId: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    return this.cartItemsService.update(documentId, updateCartItemDto);
  }

  @Delete(':documentId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('documentId') documentId: string) {
    return this.cartItemsService.remove(documentId);
  }
}
