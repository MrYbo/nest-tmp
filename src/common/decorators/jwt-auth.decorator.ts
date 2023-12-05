import { SetMetadata } from '@nestjs/common';

export const JWT_AUTH_KEY = 'jwt-auth';

export const JwtAuth = () => SetMetadata(JWT_AUTH_KEY, true);
