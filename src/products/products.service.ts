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
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class ProductsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(createProductDto: CreateProductDto) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'products', createProductDto.documentId);
    await setDoc(docRef, {
      ...createProductDto,
      date: new Date(createProductDto.date),
    });
    return createProductDto;
  }

  async findAll() {
    const firestore = this.firebaseService.getFirestore();
    const snapshot = await getDocs(collection(firestore, 'products'));
    return snapshot.docs.map((doc) => ({ ...doc.data(), documentId: doc.id }));
  }

  async findOne(productId: string) {
    const firestore = this.firebaseService.getFirestore();
    const productsQuery = query(
      collection(firestore, 'products'),
      where('productId', '==', productId),
    );
    const querySnapshot = await getDocs(productsQuery);
    if (querySnapshot.empty) {
      throw new NotFoundException(`Ürün bulunamadı: productId=${productId}`);
    }
    const docSnap = querySnapshot.docs[0];
    return { ...docSnap.data(), documentId: docSnap.id };
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    const firestore = this.firebaseService.getFirestore();
    const productsQuery = query(
      collection(firestore, 'products'),
      where('productId', '==', productId),
    );
    const querySnapshot = await getDocs(productsQuery);
    if (querySnapshot.empty) {
      throw new NotFoundException(`Ürün bulunamadı: productId=${productId}`);
    }
    const docRef = doc(firestore, 'products', querySnapshot.docs[0].id);
    await setDoc(
      docRef,
      {
        ...updateProductDto,
        date: updateProductDto.date
          ? new Date(updateProductDto.date)
          : querySnapshot.docs[0].data().date,
      },
      { merge: true },
    );
    return {
      ...querySnapshot.docs[0].data(),
      ...updateProductDto,
      documentId: querySnapshot.docs[0].id,
    };
  }

  async remove(productId: string) {
    const firestore = this.firebaseService.getFirestore();
    const productsQuery = query(
      collection(firestore, 'products'),
      where('productId', '==', productId),
    );
    const querySnapshot = await getDocs(productsQuery);
    if (querySnapshot.empty) {
      throw new NotFoundException(`Ürün bulunamadı: productId=${productId}`);
    }
    const docRef = doc(firestore, 'products', querySnapshot.docs[0].id);
    await deleteDoc(docRef);
  }
}
