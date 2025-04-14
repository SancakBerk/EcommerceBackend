import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FirebaseService } from 'src/firebase/firebase.service'; // Firebase service'i ekle
import { User } from 'src/users/user.entity'; // User entity'sini import et

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly firebaseService: FirebaseService, // Firebase servisinin eklenmesi
  ) {}

  // Kullanıcı doğrulama ve token oluşturma
  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.firebaseService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Kullanıcı bulunamadı');
    }

    const payload = { uid: user.uid, email: user.email };
    const accessToken = this.jwtService.sign(payload); // Token oluşturma

    return { access_token: accessToken };
  }

  // JWT token'dan kullanıcıyı doğrulama
  async validateUser(payload: any): Promise<User> {
    const user = await this.firebaseService.getUser(payload.uid); // Firebase'den kullanıcı al
    if (!user) {
      throw new UnauthorizedException('Geçersiz kullanıcı');
    }
    return user;
  }
}
