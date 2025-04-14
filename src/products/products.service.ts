import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class ProductService {
  private db = admin.firestore();

  async addProduct(dto: CreateProductDto) {
    const newProduct = await this.db.collection('products').add(dto);
    return { id: newProduct.id, ...dto };
  }

  async listProducts() {
    const snapshot = await this.db.collection('products').get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
}
