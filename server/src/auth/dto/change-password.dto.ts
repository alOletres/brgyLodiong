import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  currentPassword: string;
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
