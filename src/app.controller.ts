import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello from the API!'; // Root endpoint'ini buraya ekleyin
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard) // Sadece profile endpoint'ini korumak için guard'ı buraya ekleyin
  getProfile() {
    return { message: 'Api Working' };
  }
}
