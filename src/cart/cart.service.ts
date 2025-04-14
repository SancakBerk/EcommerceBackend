import { Injectable } from '@nestjs/common';
import { AddToCartDto } from './dto/add-to-cart.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class CartService {
  private db = admin.firestore();

  async addToCart(uid: string, dto: AddToCartDto) {
    const cartRef = this.db.collection('carts').doc(uid);
    const cartDoc = await cartRef.get();

    const items = cartDoc.exists ? cartDoc.data()?.items || [] : [];

    const updatedItems = [...items, dto];

    await cartRef.set({ items: updatedItems });
    return { message: 'Product added to cart' };
  }

  async getCart(uid: string) {
    const doc = await this.db.collection('carts').doc(uid).get();
    return doc.exists ? doc.data() : { items: [] };
  }
}
