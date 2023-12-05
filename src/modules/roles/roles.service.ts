import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  findAll() {
    return `This action returns all roles`;
  }

  findByUser(id: number) {
    return `This action returns a #${id} role`;
  }
}
