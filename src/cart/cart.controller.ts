import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':uid')
  addToCart(@Param('uid') uid: string, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(uid, dto);
  }

  @Get(':uid')
  getCart(@Param('uid') uid: string) {
    return this.cartService.getCart(uid);
  }
}



