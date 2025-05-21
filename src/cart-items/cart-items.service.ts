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
import { CreateCartItemDto, UpdateCartItemDto } from '../dto/cartItem.dto';
import { FirebaseService } from '../firebase/firebase.service';

// DTO'yu düz objeye dönüştüren yardımcı fonksiyon
function toPlainObject(dto: any): any {
  const plainObject = { ...dto };
  if (plainObject.product) {
    plainObject.product = { ...plainObject.product }; // Ürün objesini düzleştir
  }
  delete plainObject.documentId; // documentId'yi kaldır, addDoc otomatik oluşturacak
  return plainObject;
}

@Injectable()
export class CartItemsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(createCartItemDto: CreateCartItemDto) {
    const firestore = this.firebaseService.getFirestore();

    // DTO'yu düz objeye dönüştür
    const cartItemData = toPlainObject(createCartItemDto);

    // addDoc ile otomatik ID oluştur
    const docRef = await addDoc(
      collection(firestore, 'cartItems'),
      cartItemData,
    );

    // Oluşturulan documentId'yi ekle
    const createdCartItem = {
      ...createCartItemDto,
      documentId: docRef.id,
    };

    return createdCartItem;
  }

  async findByUser(userId: number) {
    const firestore = this.firebaseService.getFirestore();
    const q = query(
      collection(firestore, 'cartItems'),
      where('userId', '==', userId),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ documentId: doc.id, ...doc.data() }));
  }

  async findOne(documentId: string) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'cartItems', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Sepet öğesi bulunamadı');
    }
    return { documentId: docSnap.id, ...docSnap.data() };
  }

  async update(documentId: string, updateCartItemDto: UpdateCartItemDto) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'cartItems', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Sepet öğesi bulunamadı');
    }

    // DTO'yu düz objeye dönüştür
    const cartItemData = toPlainObject(updateCartItemDto);

    await setDoc(docRef, cartItemData, { merge: true });
    return { documentId, ...docSnap.data(), ...updateCartItemDto };
  }

  async remove(documentId: string) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'cartItems', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Sepet öğesi bulunamadı');
    }
    await deleteDoc(docRef);
  }
}
