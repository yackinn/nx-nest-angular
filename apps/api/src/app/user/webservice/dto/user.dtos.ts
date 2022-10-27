import { PartialType }                   from '@nestjs/swagger';
import { IRegisterDto }                  from '@nx-angular-nest/domain';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Password }                      from '../../../shared/password.validator';

export class RegisterDto implements IRegisterDto {
  @IsEmail()
  email: string;

  @Password()
  password: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}

export class UpdateUserDto extends PartialType(RegisterDto) {
  @IsString()
  id: string;
}
