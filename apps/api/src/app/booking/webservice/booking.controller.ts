import { Controller, }    from '@nestjs/common';
import { BookingService } from '../booking.service';

@Controller('api/bookings')
export class BookingController {

  constructor(
    private readonly bookingService: BookingService
  ) {}

}
