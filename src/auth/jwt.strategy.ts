import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { FirebaseService } from '../firebase/firebase.service';
import { UserType } from '../types/globalTypes';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly firebaseService: FirebaseService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { uid: number; email: string }): Promise<UserType> {
    const user = await this.firebaseService.getUser(payload.uid);
    if (!user) {
      throw new UnauthorizedException('Geçersiz kullanıcı');
    }
    return user;
  }
}
