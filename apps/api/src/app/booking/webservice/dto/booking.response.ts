import { BaseDto } from '../../../shared/base.dto';

export class BookingResponse extends BaseDto {
  paymentMethod: string;
  paid: boolean;
  reminded: boolean;
  cancelled: boolean;
  notes: string;
}

// **target=libs/core/domain/src/lib/booking
