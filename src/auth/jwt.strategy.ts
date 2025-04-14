import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Bearer token'dan al
      ignoreExpiration: false, // Token süresi dolmuşsa hata ver
      secretOrKey: 'secretKey', // Secret key
    });
  }

  async validate(payload: any) {
    return this.authService.validateUser(payload); // Token'dan gelen bilgiyi kontrol et
  }
}
