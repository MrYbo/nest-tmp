import {SetMetadata} from '@nestjs/common';
import {AuthStrategies, AuthStrategyKey} from '../constant/constant';

export const LocalAuth = () => SetMetadata(AuthStrategyKey.BASE_KEY, AuthStrategies.LOCAL);
