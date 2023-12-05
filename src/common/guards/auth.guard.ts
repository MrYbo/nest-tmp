import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as _AuthGuard, IAuthGuard } from '@nestjs/passport';
import { SELECT_AUTH_KEY } from '../decorators/auth.decorator';
import { AuthStrategies } from '../constant/constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private static getAuthGuard(auth?: string): IAuthGuard {
    // let guard: IAuthGuard;
    // switch (auth) {
    //   case AuthStrategies.LOCAL:
    //     guard = new (_AuthGuard('local'))();
    //     break;
    //   case AuthStrategies.JWT:
    //     guard = new (_AuthGuard('jwt'))();
    //     break;
    // }
    return new (_AuthGuard('jwt'))();
  }

  canActivate(context: ExecutionContext) {
    const auth = this.reflector.getAllAndOverride<string>(SELECT_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!auth || auth === AuthStrategies.NO) {
      return true;
    }

    const guard = AuthGuard.getAuthGuard(auth);
    return guard.canActivate(context);
  }
}
