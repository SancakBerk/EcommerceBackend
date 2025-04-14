import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  add(@Body() dto: CreateProductDto) {
    return this.productService.addProduct(dto);
  }

  @Get()
  list() {
    return this.productService.listProducts();
  }
}
