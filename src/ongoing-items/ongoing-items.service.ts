import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Firestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
} from 'firebase/firestore';
import {
  CreateOngoingItemDto,
  UpdateOngoingItemDto,
} from '../dto/ongoingItem.dto';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class OngoingItemsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(createOngoingItemDto: CreateOngoingItemDto) {
    const firestore = this.firebaseService.getFirestore();
    await setDoc(
      doc(firestore, 'ongoingItems', createOngoingItemDto.documentId),
      {
        ...createOngoingItemDto,
        date: new Date(createOngoingItemDto.date),
      },
    );
    return createOngoingItemDto;
  }

  async findAll() {
    const firestore = this.firebaseService.getFirestore();
    const snapshot = await getDocs(collection(firestore, 'ongoingItems'));
    return snapshot.docs.map((doc) => doc.data());
  }

  async findOne(documentId: string) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'ongoingItems', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Devam eden öğe bulunamadı');
    }
    return docSnap.data();
  }

  async update(documentId: string, updateOngoingItemDto: UpdateOngoingItemDto) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'ongoingItems', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Devam eden öğe bulunamadı');
    }
    await setDoc(
      docRef,
      {
        ...updateOngoingItemDto,
        date: updateOngoingItemDto.date
          ? new Date(updateOngoingItemDto.date)
          : docSnap.data().date,
      },
      { merge: true },
    );
    return { ...docSnap.data(), ...updateOngoingItemDto };
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
