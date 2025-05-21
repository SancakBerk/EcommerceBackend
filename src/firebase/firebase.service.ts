import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {
  Firestore,
  doc,
  getDoc,
  getDocs,
  collection,
  getFirestore,
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { UserType } from '../types/globalTypes';

@Injectable()
export class FirebaseService {
  private firestore: Firestore;

  constructor() {
    if (!process.env.FIREBASE_PRIVATE_KEY) {
      throw new InternalServerErrorException(
        'FIREBASE_PRIVATE_KEY çevre değişkeni tanımlı değil',
      );
    }

    const firebaseConfig = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      clientId: process.env.FIREBASE_CLIENT_ID,
      authUri: process.env.FIREBASE_AUTH_URI,
      tokenUri: process.env.FIREBASE_TOKEN_URI,
      authProviderX509CertUrl: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      clientX509CertUrl: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    };
    const app = initializeApp(firebaseConfig);
    this.firestore = getFirestore(app);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserType | null> {
    const snapshot = await getDocs(collection(this.firestore, 'users'));
    const user = snapshot.docs.find((doc) => doc.data().email === email);
    if (!user) return null;
    return user.data() as UserType;
  }

  async getUser(userId: number): Promise<UserType | null> {
    const snapshot = await getDocs(collection(this.firestore, 'users'));
    const user = snapshot.docs.find((doc) => doc.data().userId === userId);
    if (!user) return null;
    return user.data() as UserType;
  }

  getFirestore(): Firestore {
    return this.firestore;
  }
}
