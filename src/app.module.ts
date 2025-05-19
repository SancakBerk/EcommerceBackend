import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { CartItemsModule } from './cart-items/cart-items.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrdersModule } from './orders/orders.module';
import { OngoingItemsModule } from './ongoing-items/ongoing-items.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    CartItemsModule,
    ReviewsModule,
    OrdersModule,
    OngoingItemsModule,
    FirebaseModule,
  ],
})
export class AppModule {}
