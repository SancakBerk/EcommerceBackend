import { IsString, IsNumber, IsOptional, IsArray } from 'class-validator';

export class CreateCategoryDto {
  @IsNumber()
  categoryId: number;

  @IsString()
  documentId: string;

  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsArray()
  @IsOptional()
  subCategories?: CreateCategoryDto[];

  @IsString()
  imageUrl: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  parentId?: number;
}

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsArray()
  @IsOptional()
  subCategories?: UpdateCategoryDto[];

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  parentId?: number;
}
