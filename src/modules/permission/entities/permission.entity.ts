import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../base/base.entity';

@Entity()
export class Permission extends BaseEntity {
  // @OneToOne({entity: () => Role, mappedBy: 'id', })
  // role = new Collection<Role>(this);

  @Property({ type: 'json' })
  admin: object;

  @Property({ type: 'json' })
  manager: object;
}
