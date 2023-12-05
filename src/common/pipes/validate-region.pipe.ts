import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import region from '../constant/region.json';

@ValidatorConstraint({ name: 'ValidateRegion', async: false })
export class ValidateRegionPipe implements ValidatorConstraintInterface {
  validate(value: any): Promise<boolean> | boolean {
    if (value === undefined) {
      return true;
    }
    return region[value];
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args?: ValidationArguments): string {
    return 'region $value is notfound!';
  }
}
