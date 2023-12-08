import {Entity, Property} from '@mikro-orm/core';
import {BaseEntity} from '../../../base/base.entity';
import {RoleLevel} from "../../../common/constant/constant";

@Entity()
export class Role extends BaseEntity {
	@Property()
	roleName: string;

	@Property()
	level: RoleLevel

	@Property()
	description: string;

	@Property({hidden: true})
	createdAt;

	@Property({hidden: true})
	updatedAt;
}
