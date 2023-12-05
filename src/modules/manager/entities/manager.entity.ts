import {
  BeforeCreate,
  Entity,
  EntityRepositoryType,
  EventArgs,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import bcrypt from 'bcrypt';
import { ManagerRepository } from './manager.repository';
import { Role } from '../../roles/entities/role.entity';
import { BaseEntity } from '../../../base/base.entity';

@Entity({ customRepository: () => ManagerRepository })
export class Manager extends BaseEntity {
  [EntityRepositoryType]?: ManagerRepository;

  @PrimaryKey()
  id!: number;

  @Property()
  username: string;

  @Property({
    hidden: true,
  })
  password: string;

  @Property()
  phone: string;

  @Property()
  nickname: string = '';

  @Property()
  address: string = '';

  @Property({
    nullable: true,
  })
  region: number;

  @Property({
    fieldName: 'subRegion',
  })
  subRegion: string = '';

  @OneToOne({
    fieldName: 'role',
  })
  role: Role;

  @BeforeCreate()
  private async beforeCreate(args: EventArgs<Manager>) {
    const saltRounds = 10;
    args.entity.password = await bcrypt.hash(args.entity.password, saltRounds);
  }
}
