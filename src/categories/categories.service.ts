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
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { FirebaseService } from '../firebase/firebase.service';

// DTO'yu düz objeye dönüştüren yardımcı fonksiyon
function toPlainObject(dto: any): any {
  const plainObject = { ...dto };
  if (plainObject.subCategories) {
    plainObject.subCategories = plainObject.subCategories.map((sub: any) =>
      toPlainObject(sub),
    );
  }
  // documentId varsa kaldır, çünkü addDoc otomatik oluşturacak
  delete plainObject.documentId;
  return plainObject;
}

@Injectable()
export class CategoriesService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const firestore = this.firebaseService.getFirestore();

    // DTO'yu düz objeye dönüştür
    const categoryData = toPlainObject(createCategoryDto);

    // addDoc ile otomatik ID oluştur
    const docRef = await addDoc(
      collection(firestore, 'categories'),
      categoryData,
    );

    // Oluşturulan documentId'yi ekle
    const createdCategory = {
      ...createCategoryDto,
      documentId: docRef.id,
    };

    return createdCategory;
  }

  async findAll() {
    const firestore = this.firebaseService.getFirestore();
    const snapshot = await getDocs(collection(firestore, 'categories'));
    return snapshot.docs.map((doc) => ({ documentId: doc.id, ...doc.data() }));
  }

  async findOne(documentId: string) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'categories', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Kategori bulunamadı');
    }
    return { documentId: docSnap.id, ...docSnap.data() };
  }

  async update(documentId: string, updateCategoryDto: UpdateCategoryDto) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'categories', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Kategori bulunamadı');
    }

    // DTO'yu düz objeye dönüştür
    const categoryData = toPlainObject(updateCategoryDto);

    await setDoc(docRef, categoryData, { merge: true });
    return { documentId, ...docSnap.data(), ...updateCategoryDto };
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
