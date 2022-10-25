import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity }       from '../../shared/base.entity';
import { CreateUserDto }    from '../webservice/dto/user.dtos';

// admin or driving school owner
@Entity()
export class User extends BaseEntity {
  @Property({ unique: true })
  email: string;

  @Property({ nullable: true })
  firstName?: string;

  @Property({ nullable: true })
  lastName?: string;

  @Property({ hidden: true })
  password: string;

  constructor(user: CreateUserDto) {
    super();
    this.email     = user.email;
    this.firstName = user.firstName;
    this.lastName  = user.lastName;
    this.password  = user.password;
  }

}
