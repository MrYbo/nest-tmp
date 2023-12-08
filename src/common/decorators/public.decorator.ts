import {SetMetadata} from '@nestjs/common';
import {AuthStrategyKey} from "../constant/constant";

export const Public = () => SetMetadata(AuthStrategyKey.PUBLIC_KEY, true);
