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
import {
  CreateProductReviewDto,
  UpdateProductReviewDto,
} from '../dto/review.dto';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(createProductReviewDto: CreateProductReviewDto) {
    const firestore = this.firebaseService.getFirestore();
    await setDoc(doc(firestore, 'reviews', createProductReviewDto.documentId), {
      ...createProductReviewDto,
      reviewDate: new Date(createProductReviewDto.reviewDate),
    });
    return createProductReviewDto;
  }

  async findByProduct(productId: number) {
    const firestore = this.firebaseService.getFirestore();
    const q = query(
      collection(firestore, 'reviews'),
      where('productId', '==', productId),
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
  }

  async findOne(documentId: string) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'reviews', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Yorum bulunamadı');
    }
    return docSnap.data();
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
    await setDoc(
      docRef,
      {
        ...updateProductReviewDto,
        reviewDate: updateProductReviewDto.reviewDate
          ? new Date(updateProductReviewDto.reviewDate)
          : docSnap.data().reviewDate,
      },
      { merge: true },
    );
    return { ...docSnap.data(), ...updateProductReviewDto };
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
