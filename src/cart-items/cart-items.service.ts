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
} from 'firebase/firestore';
import { CreateCartItemDto, UpdateCartItemDto } from '../dto/cartItem.dto';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class CartItemsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(createCartItemDto: CreateCartItemDto) {
    const firestore = this.firebaseService.getFirestore();
    await setDoc(
      doc(firestore, 'cartItems', createCartItemDto.documentId),
      createCartItemDto,
    );
    return createCartItemDto;
  }

  async findByUser(userId: number) {
    const firestore = this.firebaseService.getFirestore();
    const q = query(
      collection(firestore, 'cartItems'),
      where('userId', '==', userId),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
  }

  async findOne(documentId: string) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'cartItems', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Sepet öğesi bulunamadı');
    }
    return docSnap.data();
  }

  async update(documentId: string, updateCartItemDto: UpdateCartItemDto) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'cartItems', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Sepet öğesi bulunamadı');
    }
    await setDoc(docRef, updateCartItemDto, { merge: true });
    return { ...docSnap.data(), ...updateCartItemDto };
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
