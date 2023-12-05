import { Transform } from 'class-transformer';

export class FindPageDto {
  @Transform(({ value }) => parseInt(value))
  limit: number = 10;

  @Transform(({ value }) => parseInt(value))
  offset: number = 0;

  groupBy?: string | string[];

  orderBy?: string;

  @Transform(({ value }) => value as boolean | never)
  populate?: never;
}
