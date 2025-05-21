export type UserType = {
  userId: number;
  documentId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  createdAt: number;
  updatedAt?: number;
  role: 'user' | 'admin';
};

export type ProductType = {
  productId: number;
  documentId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl: string[];
  date: number;
  discountPercentage?: number;
  categoryId: number;
  parentCategoryId?: number;
  averageStars: number;
};

export interface categoryType {
  categoryId: number;
  documentId?: string; // Opsiyonel
  name: string;
  slug: string;
  subCategories?: categoryType[];
  imageUrl: string;
  description?: string;
  parentId?: number;
}
export type CartItemType = {
  cartItemId: number;
  documentId: string;
  userId: number;
  product: ProductType;
  quantity: number;
};

export type ProductReviewType = {
  reviewId: number;
  documentId: string;
  productId: number;
  userId: number;
  userName: string;
  userImageUrl: string;
  reviewDate: number;
  reviewText: string;
  givenStars: number;
  reviewLikes: number;
  reviewDislikes: number;
  reviewReplies?: ProductReviewType[];
};

export type OrderType = {
  orderId: number;
  documentId: string;
  userId: number;
  items: CartItemType[];
  totalAmount: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: number;
  shippingAddress?: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  paymentMethod: 'creditCard' | 'paypal' | 'cashOnDelivery';
};

export type OngoingItemType = {
  itemId: number;
  documentId: string;
  title: string;
  description: string;
  imageUrl: string;
  date: number;
  link?: string;
  author: string;
  authorImageUrl: string;
};

export type ServiceReturnType<T = unknown> = {
  success: boolean;
  data?: T;
  message?: string;
  status: number;
};
