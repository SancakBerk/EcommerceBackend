import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
  query,
  where,
  addDoc,
} from 'firebase/firestore';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';
import { FirebaseService } from '../firebase/firebase.service';

// DTO'yu düz objeye dönüştüren yardımcı fonksiyon
function toPlainObject(dto: any): any {
  const plainObject = { ...dto };
  if (plainObject.items) {
    plainObject.items = plainObject.items.map((item: any) => ({
      ...item,
      product: item.product ? { ...item.product } : item.product,
    }));
  }
  if (plainObject.shippingAddress) {
    plainObject.shippingAddress = { ...plainObject.shippingAddress };
  }
  plainObject.createdAt = new Date(dto.createdAt); // Tarih dönüştürme
  delete plainObject.documentId; // documentId'yi kaldır
  return plainObject;
}

@Injectable()
export class OrdersService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(createOrderDto: CreateOrderDto) {
    const firestore = this.firebaseService.getFirestore();

    // DTO'yu düz objeye dönüştür
    const orderData = toPlainObject(createOrderDto);

    // addDoc ile otomatik ID oluştur
    const docRef = await addDoc(collection(firestore, 'orders'), orderData);

    // Oluşturulan documentId'yi ekle
    const createdOrder = {
      ...createOrderDto,
      documentId: docRef.id,
    };

    return createdOrder;
  }

  async findByUser(userId: number) {
    const firestore = this.firebaseService.getFirestore();
    const q = query(
      collection(firestore, 'orders'),
      where('userId', '==', userId),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ documentId: doc.id, ...doc.data() }));
  }

  async findOne(documentId: string) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'orders', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Sipariş bulunamadı');
    }
    return { documentId: docSnap.id, ...docSnap.data() };
  }

  async update(documentId: string, updateOrderDto: UpdateOrderDto) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'orders', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Sipariş bulunamadı');
    }

    // DTO'yu düz objeye dönüştür
    const orderData = toPlainObject(updateOrderDto);

    // Orijinal createdAt korunur
    orderData.createdAt = docSnap.data().createdAt;

    await setDoc(docRef, orderData, { merge: true });
    return { documentId, ...docSnap.data(), ...updateOrderDto };
  }

  async remove(documentId: string) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'orders', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Sipariş bulunamadı');
    }
    await deleteDoc(docRef);
  }
}
