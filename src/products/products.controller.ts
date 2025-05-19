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
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':documentId')
  async findOne(@Param('documentId') documentId: string) {
    return this.productsService.findOne(documentId);
  }

  @Put(':documentId')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('documentId') documentId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(documentId, updateProductDto);
  }

  @Delete(':documentId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('documentId') documentId: string) {
    return this.productsService.remove(documentId);
  }
}
