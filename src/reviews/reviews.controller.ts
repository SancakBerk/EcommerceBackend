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
import { ReviewsService } from './reviews.service';
import {
  CreateProductReviewDto,
  UpdateProductReviewDto,
} from '../dto/review.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createProductReviewDto: CreateProductReviewDto) {
    return this.reviewsService.create(createProductReviewDto);
  }

  @Get('product/:productId')
  async findByProduct(@Param('productId') productId: string) {
    return this.reviewsService.findByProduct(Number(productId));
  }

  @Get(':documentId')
  async findOne(@Param('documentId') documentId: string) {
    return this.reviewsService.findOne(documentId);
  }

  @Put(':documentId')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('documentId') documentId: string,
    @Body() updateProductReviewDto: UpdateProductReviewDto,
  ) {
    return this.reviewsService.update(documentId, updateProductReviewDto);
  }

  @Delete(':documentId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('documentId') documentId: string) {
    return this.reviewsService.remove(documentId);
  }
}
