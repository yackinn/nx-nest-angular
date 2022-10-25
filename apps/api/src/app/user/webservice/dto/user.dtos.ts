import { PartialType }                   from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { BaseDto }                       from '../../../shared/base.dto';
import { Password }                      from '../../../shared/password.validator';

export class CreateUserDto extends BaseDto {
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

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// **target=libs/core/domain/src/lib/user
