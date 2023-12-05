import {
  BeforeCreate,
  Entity,
  EntityRepositoryType,
  EventArgs,
  OneToOne,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from '../../../base/base.entity';
import { AdminRepository } from './admin.repository';
import { Role } from '../../roles/entities/role.entity';
import bcrypt from 'bcrypt';

@Entity({ customRepository: () => AdminRepository })
export class Admin extends BaseEntity {
  [EntityRepositoryType]?: AdminRepository;

  @Property()
  @Unique()
  username!: string;

  @Property({
    hidden: true,
  })
  password!: string;

  @Property()
  @Unique()
  phone: string;

  @Property()
  nickname: string = '';

  @Property()
  address: string = '';

  @Property({
    nullable: true,
  })
  region: number;

  @Property()
  subRegion: string = '';

  @OneToOne({
    fieldName: 'role',
  })
  role: Role;

  @BeforeCreate()
  private async beforeCreate(args: EventArgs<Admin>) {
    const saltRounds = 10;
    args.entity.password = await bcrypt.hash(args.entity.password, saltRounds);
  }
}
