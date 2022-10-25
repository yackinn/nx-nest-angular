import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 }                           from 'uuid';

@Entity({ abstract: true })
export abstract class BaseEntity {
  @PrimaryKey()
  id: string = v4();

  @Property({ hidden: true, columnType: 'timestamptz' })
  createdAt: Date = new Date();

  @Property({ hidden: true, columnType: 'timestamptz', nullable: true, onUpdate: () => new Date() })
  updatedAt?: Date;

  getEntityName() {
    return this['__meta'].className;
  }
}
