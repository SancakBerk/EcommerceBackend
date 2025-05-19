import {
  IsString,
  IsNumber,
  IsOptional,
  IsEmail,
  IsEnum,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  userId: number;

  @IsString()
  documentId: string;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsOptional()
  address?: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };

  @IsNumber()
  createdAt: number;

  @IsNumber()
  @IsOptional()
  updatedAt?: number;

  @IsEnum(['user', 'admin'])
  role: 'user' | 'admin';
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsOptional()
  address?: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };

  @IsNumber()
  @IsOptional()
  updatedAt?: number;

  @IsEnum(['user', 'admin'])
  @IsOptional()
  role?: 'user' | 'admin';
}
