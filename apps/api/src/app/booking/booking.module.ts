import { Module }            from '@nestjs/common';
import { BookingService }    from './booking.service';
import { BookingController } from './webservice/booking.controller';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
  imports: []
})
export class BookingModule {}
