import { PartialType }                     from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { BaseDto }                         from '../../../shared/base.dto';

export class CreateBookingDto extends BaseDto {
  @IsString()
  paymentMethod: string;

  @IsBoolean()
  paid: boolean;

  @IsBoolean()
  reminded: boolean;

  @IsBoolean()
  @IsOptional()
  cancelled?: boolean;

  @IsString()
  @IsOptional()
  notes?: string;
}

export class UpdateBookingDto extends PartialType(CreateBookingDto) {}

// **target=libs/core/domain/src/lib/booking
