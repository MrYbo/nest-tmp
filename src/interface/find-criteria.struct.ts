import { FilterQuery } from '@mikro-orm/core/typings';
import { FindOptions } from '@mikro-orm/core';

export interface FindCriteriaStruct<T, P extends string = never> {
  where: FilterQuery<T>;
  options?: FindOptions<T, P>;
}
