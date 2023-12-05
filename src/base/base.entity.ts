import { PrimaryKey, Property } from '@mikro-orm/core';

export class BaseEntity {
  @PrimaryKey({
    comment: '主键id',
    autoincrement: true,
  })
  id!: number;

  @Property({
    fieldName: 'createdAt',
  })
  createdAt = new Date();

  @Property({
    fieldName: 'updatedAt',
    onUpdate: () => new Date(),
  })
  updatedAt = new Date();
}
