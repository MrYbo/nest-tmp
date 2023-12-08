import {Injectable} from '@nestjs/common';
import {EntityManager} from '@mikro-orm/core';
import {Admin} from '../admin/entities/admin.entity';
import {JwtPayloadStruct} from '../../interface/jwt-payload.struct';
import {JwtService} from '@nestjs/jwt';
import {RoleModel} from '../../common/constant/constant';
import bcrypt from 'bcrypt';
import {Role} from '../roles/entities/role.entity';
import {ConfigService} from '@nestjs/config';
import {LoginAuthDto} from './dto/login-auth.dto';

@Injectable()
export class AuthService {
	private ModelToEntity = {
		admin: Admin,
	};

	constructor(
			private readonly em: EntityManager,
			private readonly jwtService: JwtService,
			private readonly config: ConfigService,
	) {
	}

	async validateUser(model: string, lat: LoginAuthDto): Promise<Promise<any> | Promise<boolean>> {
		const entity = this.ModelToEntity[model];
		const user = await this.em.findOne(entity, {username: lat.username});
		await this.em.findOne(Role, {id: user['role']});
		if (!user || !(await bcrypt.compare(lat.password, user['password']))) {
			return false;
		}
		return user;
	}

	async findByPk(role: RoleModel, id: number) {
		const entity = this.ModelToEntity[role];
		const user = await this.em.findOne(entity, {id});
		if (!user) return null;
		await this.em.findOne(Role, {id: user['role']});
		return user;
	}

	issueToken(role: RoleModel, user: object): string {
		const payload: JwtPayloadStruct = {sub: user['id'], role};
		return this.jwtService.sign(payload);
	}

	verifyToken(token: string): boolean {
		if (!token) return null;
		let data;
		try {
			data = this.jwtService.verify(token, {secret: this.config.get('jwt.secret')});
		} catch (e) {
			data = null;
		}
		return data;
	}
}
