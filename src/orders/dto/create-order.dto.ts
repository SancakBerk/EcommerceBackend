// order/dto/create-order.dto.ts
export class CreateOrderDto {
  products: {
    productId: string;
    quantity: number;
  }[];
  totalPrice: number;
  address: string;
}
