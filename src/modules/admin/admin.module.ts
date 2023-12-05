import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Admin } from './entities/admin.entity';
import { Role } from '../roles/entities/role.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Admin, Role])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
