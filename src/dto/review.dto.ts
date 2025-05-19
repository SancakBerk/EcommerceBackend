import { IsNumber, IsString, IsOptional, IsArray } from 'class-validator';

export class CreateProductReviewDto {
  @IsNumber()
  reviewId: number;

  @IsString()
  documentId: string;

  @IsNumber()
  productId: number;

  @IsNumber()
  userId: number;

  @IsString()
  userName: string;

  @IsString()
  userImageUrl: string;

  @IsNumber()
  reviewDate: number;

  @IsString()
  reviewText: string;

  @IsNumber()
  givenStars: number;

  @IsNumber()
  reviewLikes: number;

  @IsNumber()
  reviewDislikes: number;

  @IsArray()
  @IsOptional()
  reviewReplies?: CreateProductReviewDto[];
}

export class UpdateProductReviewDto {
  @IsString()
  @IsOptional()
  userName?: string;

  @IsString()
  @IsOptional()
  userImageUrl?: string;

  @IsNumber()
  @IsOptional()
  reviewDate?: number;

  @IsString()
  @IsOptional()
  reviewText?: string;

  @IsNumber()
  @IsOptional()
  givenStars?: number;

  @IsNumber()
  @IsOptional()
  reviewLikes?: number;

  @IsNumber()
  @IsOptional()
  reviewDislikes?: number;

  @IsArray()
  @IsOptional()
  reviewReplies?: UpdateProductReviewDto[];
}
