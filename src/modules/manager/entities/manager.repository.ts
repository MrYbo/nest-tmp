import { EntityRepository } from '@mikro-orm/mysql';
import { Manager } from './manager.entity';

export class ManagerRepository extends EntityRepository<Manager> {}
