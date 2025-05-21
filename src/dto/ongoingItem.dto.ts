import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateOngoingItemDto {
  @IsNumber()
  itemId: number;

  @IsString()
  @IsOptional() // documentId artık opsiyonel
  documentId?: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  imageUrl: string;

  @IsNumber()
  date: number;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  author: string;

  @IsString()
  authorImageUrl: string;
}

export class UpdateOngoingItemDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @IsOptional()
  date?: number;

  @IsString()
  @IsOptional()
  link?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsString()
  @IsOptional()
  authorImageUrl?: string;
}
