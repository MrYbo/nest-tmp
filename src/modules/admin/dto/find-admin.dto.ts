import { FindPageDto } from '../../../base/find-page.dto';

export class FindAdminDto extends FindPageDto {
  region?: number;

  isSubRegionAdmin?: boolean;
}
