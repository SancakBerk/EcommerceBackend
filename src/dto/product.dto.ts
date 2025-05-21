import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  productId: string;

  @IsString()
  documentId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsNumber()
  stock: number;

  @IsArray()
  @IsString({ each: true })
  imageUrl: string[];

  @IsNumber()
  date: number;

  @IsNumber()
  @IsOptional()
  discountPercentage?: number;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  @IsOptional()
  parentCategoryId?: number;

  @IsNumber()
  averageStars: number;
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  productId?: string; // String olarak tanımlı

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  imageUrl?: string[];

  @IsNumber()
  @IsOptional()
  date?: number;

  @IsNumber()
  @IsOptional()
  discountPercentage?: number;

  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @IsNumber()
  @IsOptional()
  parentCategoryId?: number;

  @IsNumber()
  @IsOptional()
  averageStars?: number;
}
