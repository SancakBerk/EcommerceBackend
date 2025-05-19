import { IsNumber, IsString, IsObject, IsOptional } from 'class-validator';
import { CreateProductDto } from './product.dto';

export class CreateCartItemDto {
  @IsNumber()
  cartItemId: number;

  @IsString()
  documentId: string;

  @IsNumber()
  userId: number;

  @IsObject()
  product: CreateProductDto;

  @IsNumber()
  quantity: number;
}

export class UpdateCartItemDto {
  @IsObject()
  @IsOptional()
  product?: CreateProductDto;

  @IsNumber()
  @IsOptional()
  quantity?: number;
}
