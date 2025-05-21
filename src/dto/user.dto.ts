import { IsInt, IsString, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  name?: string;
}
export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: 'Güncellenecek e-posta adresi',
    example: 'new.email@example.com',
    required: false,
  })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Güncellenecek parola',
    example: 'NewPassword123',
    required: false,
  })
  password?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Güncellenecek kullanıcı adı',
    example: 'Ayşe Yeni',
    required: false,
  })
  name?: string;
}
