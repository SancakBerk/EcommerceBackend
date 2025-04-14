import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class OrderService {
  private db = admin.firestore();

  async createOrder(uid: string, dto: CreateOrderDto) {
    const newOrder = await this.db.collection('orders').add({
      ...dto,
      uid,
      createdAt: new Date().toISOString(),
      status: 'pending',
    });

    return { id: newOrder.id, message: 'Order placed' };
  }

  async getOrders(uid: string) {
    const snapshot = await this.db
      .collection('orders')
      .where('uid', '==', uid)
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}
