import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../base/base.entity';

@Entity()
export class Role extends BaseEntity {
  @Property()
  roleName: string;

  @Property()
  description: string;

  @Property({ hidden: true })
  createdAt;

  @Property({ hidden: true })
  updatedAt;
}
