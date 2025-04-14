import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller'; // AppController'ı import et
import { FirebaseModule } from './firebase/firebase.module'; // Firebase modülü
import { JwtAuthGuard } from './auth/auth.guard';

@Module({
  imports: [AuthModule, FirebaseModule],
  controllers: [AppController],
  providers: [JwtAuthGuard],
})
export class AppModule {}
