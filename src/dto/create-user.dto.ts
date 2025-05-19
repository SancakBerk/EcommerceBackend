import { IsInt, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  userId: number;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  name: string;
}
