import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminRepository } from './entities/admin.repository';
import { EntityManager, FindOneOptions } from '@mikro-orm/core';
import { Admin } from './entities/admin.entity';
import { FilterQuery } from '@mikro-orm/core/typings';
import { FindCriteriaStruct } from '../../interface/find-criteria.struct';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly em: EntityManager,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const admin = this.adminRepository.create(createAdminDto);
    await this.em.flush();
    return await this.findByPk(admin.id, { populate: ['role'] });
  }

  findByPk(
    id: number,
    options: FindOneOptions<Admin, any> = {},
  ): Promise<Admin> {
    return this.adminRepository.findOne({ id }, options);
  }

  findAndCount(criteria: FindCriteriaStruct<Admin>) {
    return this.adminRepository.findAndCount(criteria.where, criteria.options);
  }

  findOne(where: FilterQuery<Admin>, options?: FindOneOptions<Admin, any>) {
    return this.adminRepository.findOne(where, options);
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminRepository.nativeUpdate({ id }, updateAdminDto);
  }

  remove(id: number) {
    return this.adminRepository.nativeDelete({ id });
  }
}
