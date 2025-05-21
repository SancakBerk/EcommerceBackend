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
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class UsersService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(createUserDto: CreateUserDto) {
    const db = this.firebaseService.getFirestore();
    const usersRef = collection(db, 'users');
    const newUser = {
      email: createUserDto.email,
      password: createUserDto.password,
      name: createUserDto.name || null, // name opsiyonel, yoksa null olacak
      createdAt: Date.now(),
    };
    const docRef = await addDoc(usersRef, newUser);
    return { id: docRef.id, ...newUser }; // Otomatik oluşturulan ID ile dön
  }

  async findAll() {
    const firestore = this.firebaseService.getFirestore();
    const snapshot = await getDocs(collection(firestore, 'users'));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(documentId: string) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'users', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }
    return { id: docSnap.id, ...docSnap.data() };
  }

  async update(documentId: string, updateUserDto: UpdateUserDto) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'users', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }
    await setDoc(
      docRef,
      { ...updateUserDto, updatedAt: Date.now() },
      { merge: true },
    );
    return { id: docSnap.id, ...docSnap.data(), ...updateUserDto };
  }

  async remove(documentId: string) {
    const firestore = this.firebaseService.getFirestore();
    const docRef = doc(firestore, 'users', documentId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }
    await deleteDoc(docRef);
  }
}
