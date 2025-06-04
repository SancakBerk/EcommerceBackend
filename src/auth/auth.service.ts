import { Injectable, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '../types/globalTypes';

@Injectable()
export class AuthService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserType | null> {
    const user = await this.firebaseService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Geçersiz kimlik bilgileri');
    }
    return user;
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string, userId: string }> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Giriş başarısız');
    }
    const payload = { email: user.email, uid: user.userId };
    return {
      accessToken: this.jwtService.sign(payload),
      userId: user.userId,
    };
  }
}
