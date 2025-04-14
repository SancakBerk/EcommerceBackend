import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseService } from 'src/firebase/firebase.service'; // Firebase servisi

@Module({
  imports: [
    JwtModule.register({
      secret: 'strong-S-E-C-R-E-T-K-E-Y', // Secret key'i buraya tanımlayın
      signOptions: { expiresIn: '1h' }, // Token süresi
    }),
  ],
  providers: [AuthService, FirebaseService],
  controllers: [AuthController],
})
export class AuthModule {}
