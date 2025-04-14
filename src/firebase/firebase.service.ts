import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import { User } from 'src/users/user.entity'; // User tipi import ediliyor
import * as dotenv from 'dotenv';
dotenv.config(); // .env dosyasını yükleyin

@Injectable()
export class FirebaseService {
  private db: firebaseAdmin.firestore.Firestore;

  constructor() {
    if (!firebaseAdmin.apps.length) {
      // ServiceAccount nesnesi oluşturuluyor
      const serviceAccount = {
        type: process.env.FIREBASE_TYPE as string,
        project_id: process.env.FIREBASE_PROJECT_ID as string,
        private_key: (process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n') ||
          '') as string, // \n karakterini düzgün hale getiriyoruz
        client_email: process.env.FIREBASE_CLIENT_EMAIL as string,
        client_id: process.env.FIREBASE_CLIENT_ID as string,
        auth_uri: process.env.FIREBASE_AUTH_URI as string,
        token_uri: process.env.FIREBASE_TOKEN_URI as string,
        auth_provider_x509_cert_url: process.env
          .FIREBASE_AUTH_PROVIDER_X509_CERT_URL as string,
        client_x509_cert_url: process.env
          .FIREBASE_CLIENT_X509_CERT_URL as string,
      };

      // Firebase Admin SDK'yı başlatıyoruz
      firebaseAdmin.initializeApp({
        credential: firebaseAdmin.credential.cert(
          serviceAccount as firebaseAdmin.ServiceAccount,
        ), // ServiceAccount türüne dönüştürme
      });
    }
    this.db = firebaseAdmin.firestore();
  }

  // Kullanıcıyı doğrulama
  async validateUser(email: string, password: string): Promise<User | null> {
    try {
      const userRecord = await firebaseAdmin.auth().getUserByEmail(email);
      if (!userRecord) return null;

      // Firebase'den gelen userRecord'u User tipine dönüştür
      const user: User = {
        uid: userRecord.uid,
        email: userRecord.email || '', // Eğer email yoksa boş string kullan
        displayName: userRecord.displayName || '', // Eğer displayName yoksa boş string kullan
      };

      return user;
    } catch (error) {
      return null; // Hata durumunda null döndür
    }
  }

  // UID ile kullanıcı bilgilerini al
  async getUser(uid: string): Promise<User | null> {
    const userDoc = await this.db.collection('users').doc(uid).get();
    const userData = userDoc.data();
    if (!userData) return null;

    // Firestore'dan gelen veriyi User tipine dönüştür
    const user: User = {
      uid: userData.uid,
      email: userData.email || '', // Eğer email yoksa boş string kullan
      displayName: userData.displayName || '', // Eğer displayName yoksa boş string kullan
    };

    return user;
  }
}
