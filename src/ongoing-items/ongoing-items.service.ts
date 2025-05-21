import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
  addDoc,
} from 'firebase/firestore';
import {
  CreateOngoingItemDto,
  UpdateOngoingItemDto,
} from '../dto/ongoingItem.dto';
import { FirebaseService } from '../firebase/firebase.service';

// DTO'yu düz objeye dönüştüren yardımcı fonksiyon
function toPlainObject(dto: any): any {
  const plainObject = { ...dto };
  plainObject.date = new Date(dto.date); // Tarih dönüştürme
  delete plainObject.documentId; // documentId'yi kaldır
  return plainObject;
}

@Injectable()
export class OngoingItemsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(createOngoingItemDto: CreateOngoingItemDto) {
    const firestore = this.firebaseService.getFirestore();

    // DTO'yu düz objeye dönüştür
    const itemData = toPlainObject(createOngoingItemDto);

    // addDoc ile otomatik ID oluştur
    const docRef = await addDoc(
      collection(firestore, 'ongoingItems'),
      itemData,
    );

    // Oluşturulan documentId'yi ekle
    const createdItem = {
      ...createOngoingItemDto,
      documentId: docRef.id,
    };

    return createdItem;
  }

  async findAll() {
    const firestore = this.firebaseService.getFirestore();
    const snapshot = await getDocs(collection(firestore, 'ongoingItems'));
    return snapshot.docs.map((doc) => ({ documentId: doc.id, ...doc.data() }));
  }

  async findOne(documentId: string) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'ongoingItems', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Devam eden öğe bulunamadı');
    }
    return { documentId: docSnap.id, ...docSnap.data() };
  }

  async update(documentId: string, updateOngoingItemDto: UpdateOngoingItemDto) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'ongoingItems', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Devam eden öğe bulunamadı');
    }

    // DTO'yu düz objeye dönüştür
    const itemData = toPlainObject(updateOngoingItemDto);

    // Orijinal date korunur, eğer yeni date verilmediyse
    itemData.date = updateOngoingItemDto.date
      ? new Date(updateOngoingItemDto.date)
      : docSnap.data().date;

    await setDoc(docRef, itemData, { merge: true });
    return { documentId, ...docSnap.data(), ...updateOngoingItemDto };
  }

  async remove(documentId: string) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'ongoingItems', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Devam eden öğe bulunamadı');
    }
    await deleteDoc(docRef);
  }
}
