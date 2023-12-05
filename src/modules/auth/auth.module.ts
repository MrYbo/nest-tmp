import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AdminModule } from '../admin/admin.module';
import { PassportModule } from '@nestjs/passport';
import { AppJwtModule } from '../../config/app.jwt.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AdminModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AppJwtModule.registerAsync(),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
