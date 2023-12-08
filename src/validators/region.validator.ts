import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface,} from 'class-validator';
import region from '../common/constant/region.json';

@ValidatorConstraint({async: false})
export class regionValidatorConstraint implements ValidatorConstraintInterface {
	validate(values: any) {
		return region[values];
	}

	defaultMessage(args: ValidationArguments): string {
		return `地区 (${args.value}) 不存在!`;
	}
}

export function RegionIsExists(validationOptions?: ValidationOptions) {
	return function (object: NonNullable<unknown>, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: regionValidatorConstraint,
		});
	};
}
