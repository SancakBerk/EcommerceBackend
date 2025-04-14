import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class UserService {
  private db = admin.firestore();

  async createUser(dto: CreateUserDto) {
    const userRef = this.db.collection('users').doc(dto.uid);
    await userRef.set({
      email: dto.email,
      name: dto.name,
      role: 'customer',
    });

    return { message: 'User created' };
  }

  async getUser(uid: string) {
    const userDoc = await this.db.collection('users').doc(uid).get();
    return userDoc.exists ? userDoc.data() : null;
  }
}
