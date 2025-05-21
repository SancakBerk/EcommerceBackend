import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsEmail({}, { message: 'Geçerli bir e-posta adresi giriniz' })
  @ApiProperty({
    description: 'Kullanıcı e-posta adresi',
    example: 'berksancak61@hotmail.com',
  })
  email: string;

  @IsString({ message: 'Parola bir string olmalıdır' })
  @ApiProperty({ description: 'Kullanıcı parolası', example: '346157.Berk' })
  password: string;
}
