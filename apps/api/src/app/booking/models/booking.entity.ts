import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity }       from '../../shared/base.entity';
import { CreateBookingDto } from '../webservice/dto/booking.dtos';

@Entity()
export class Booking extends BaseEntity {
  @Property({ nullable: true })
  paymentMethod?: string;

  @Property({ default: false })
  paid: boolean;

  @Property({ default: false })
  reminded: boolean;

  @Property({ default: false })
  cancelled: boolean;

  @Property({ columnType: 'text', nullable: true })
  notes?: string;

  constructor(booking: CreateBookingDto) {
    super();
  }
}
