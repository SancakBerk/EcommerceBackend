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
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const firestore = this.firebaseService.getFirestore();
    await setDoc(
      doc(firestore, 'categories', createCategoryDto.documentId),
      createCategoryDto,
    );
    return createCategoryDto;
  }

  async findAll() {
    const firestore = this.firebaseService.getFirestore();
    const snapshot = await getDocs(collection(firestore, 'categories'));
    return snapshot.docs.map((doc) => doc.data());
  }

  async findOne(documentId: string) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'categories', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Kategori bulunamadı');
    }
    return docSnap.data();
  }

  async update(documentId: string, updateCategoryDto: UpdateCategoryDto) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'categories', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Kategori bulunamadı');
    }
    await setDoc(docRef, updateCategoryDto, { merge: true });
    return { ...docSnap.data(), ...updateCategoryDto };
  }

  async remove(documentId: string) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'categories', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Kategori bulunamadı');
    }
    await deleteDoc(docRef);
  }
}
