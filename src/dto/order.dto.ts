import {
  IsNumber,
  IsString,
  IsArray,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { CreateCartItemDto } from './cartItem.dto';

export class CreateOrderDto {
  @IsNumber()
  orderId: number;

  @IsString()
  @IsOptional() // documentId artık opsiyonel
  documentId?: string;

  @IsNumber()
  userId: number;

  @IsArray()
  items: CreateCartItemDto[];

  @IsNumber()
  totalAmount: number;

  @IsEnum(['pending', 'shipped', 'delivered', 'cancelled'])
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';

  @IsNumber()
  createdAt: number;

  @IsOptional()
  shippingAddress?: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };

  @IsEnum(['creditCard', 'paypal', 'cashOnDelivery'])
  paymentMethod: 'creditCard' | 'paypal' | 'cashOnDelivery';
}

export class UpdateOrderDto {
  @IsArray()
  @IsOptional()
  items?: CreateCartItemDto[];

  @IsNumber()
  @IsOptional()
  totalAmount?: number;

  @IsEnum(['pending', 'shipped', 'delivered', 'cancelled'])
  @IsOptional()
  status?: 'pending' | 'shipped' | 'delivered' | 'cancelled';

  @IsOptional()
  shippingAddress?: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };

  @IsEnum(['creditCard', 'paypal', 'cashOnDelivery'])
  @IsOptional()
  paymentMethod?: 'creditCard' | 'paypal' | 'cashOnDelivery';
}
