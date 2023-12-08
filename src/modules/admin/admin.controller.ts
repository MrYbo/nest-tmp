import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query} from '@nestjs/common';
import {AdminService} from './admin.service';
import {CreateAdminDto} from './dto/create-admin.dto';
import {UpdateAdminDto} from './dto/update-admin.dto';
import {Admin} from './entities/admin.entity';
import {FindPageStruct} from '../../interface/find-page.struct';
import {FindOptions} from '@mikro-orm/core';
import {FindAdminDto} from './dto/find-admin.dto';
import {FilterQuery} from '@mikro-orm/core/typings';
import {Roles} from "../../common/decorators/roles.decorator";
import {RoleLevel} from "../../common/constant/constant";

@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {
	}

	@Roles([RoleLevel.superAdmin, RoleLevel.admin])
	@Post()
	async create(@Body() createAdminDto: CreateAdminDto) {
		return await this.adminService.create(createAdminDto).catch(() => {
			throw new HttpException({message: '参数错误'}, HttpStatus.BAD_REQUEST);
		});
	}

	@Get(':id')
	findOne(@Param('id', new ParseIntPipe()) id: number) {
		return this.adminService.findByPk(+id, {populate: ['role']});
	}

	@Get()
	async find(@Query() findDto: FindAdminDto): Promise<FindPageStruct> {
		const {limit, offset, region, isSubRegionAdmin, populate} = findDto;
		const options: FindOptions<Admin> = {limit, offset};
		if (populate) {
			options.populate = [populate];
		}

		const where: FilterQuery<Admin> = {};
		if (region) {
			where.region = region;
		}

		if (isSubRegionAdmin) {
			where.subRegion = {$ne: null};
		}
		const [data, count] = await this.adminService.findAndCount({
			where,
			options,
		});
		return {
			limit,
			offset,
			count,
			data,
		};
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
		return this.adminService.update(+id, updateAdminDto);
	}

	@Delete(':id')
	remove(@Param('id', new ParseIntPipe()) id: number) {
		return this.adminService.remove(id);
	}
}
