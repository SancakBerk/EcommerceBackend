import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':uid')
  createOrder(@Param('uid') uid: string, @Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(uid, dto);
  }

  @Get(':uid')
  getOrders(@Param('uid') uid: string) {
    return this.orderService.getOrders(uid);
  }
}
