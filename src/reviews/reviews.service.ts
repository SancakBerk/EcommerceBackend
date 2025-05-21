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
import {
  CreateProductReviewDto,
  UpdateProductReviewDto,
} from '../dto/review.dto';
import { FirebaseService } from '../firebase/firebase.service';

// DTO'yu düz objeye dönüştüren yardımcı fonksiyon
function toPlainObject(dto: any): any {
  const plainObject = { ...dto };
  if (plainObject.reviewReplies) {
    plainObject.reviewReplies = plainObject.reviewReplies.map((reply: any) =>
      toPlainObject(reply),
    );
  }
  plainObject.reviewDate = new Date(dto.reviewDate); // Tarih dönüştürme
  delete plainObject.documentId; // documentId'yi kaldır
  return plainObject;
}

@Injectable()
export class ReviewsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(createProductReviewDto: CreateProductReviewDto) {
    const firestore = this.firebaseService.getFirestore();

    // DTO'yu düz objeye dönüştür
    const reviewData = toPlainObject(createProductReviewDto);

    // addDoc ile otomatik ID oluştur
    const docRef = await addDoc(collection(firestore, 'reviews'), reviewData);

    // Oluşturulan documentId'yi ekle
    const createdReview = {
      ...createProductReviewDto,
      documentId: docRef.id,
    };

    return createdReview;
  }

  async findByProduct(productId: number) {
    const firestore = this.firebaseService.getFirestore();
    const q = query(
      collection(firestore, 'reviews'),
      where('productId', '==', productId),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ documentId: doc.id, ...doc.data() }));
  }

  async findOne(documentId: string) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'reviews', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Yorum bulunamadı');
    }
    return { documentId: docSnap.id, ...docSnap.data() };
  }

  async update(
    documentId: string,
    updateProductReviewDto: UpdateProductReviewDto,
  ) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'reviews', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Yorum bulunamadı');
    }

    // DTO'yu düz objeye dönüştür
    const reviewData = toPlainObject(updateProductReviewDto);

    // Orijinal reviewDate korunur, eğer yeni tarih verilmediyse
    reviewData.reviewDate = updateProductReviewDto.reviewDate
      ? new Date(updateProductReviewDto.reviewDate)
      : docSnap.data().reviewDate;

    await setDoc(docRef, reviewData, { merge: true });
    return { documentId, ...docSnap.data(), ...updateProductReviewDto };
  }

  async remove(documentId: string) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'reviews', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Yorum bulunamadı');
    }
    await deleteDoc(docRef);
  }
}
