import {SetMetadata} from '@nestjs/common';
import {AuthStrategies, AuthStrategyKey} from '../constant/constant';

export const JwtAuth = () => SetMetadata(AuthStrategyKey.BASE_KEY, AuthStrategies.JWT);
