import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

export function ValidateWithDrawMoney(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'ValidateWithDrawMoney',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: ValidateWithDrawMoneyConstraint,
    });
  };
}

@ValidatorConstraint()
class ValidateWithDrawMoneyConstraint implements ValidatorConstraintInterface {
  defaultMessage(validationArguments?: ValidationArguments): string {
    return '출금 금액은 1000원 단위로 할 수 있습니다.';
  }

  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    return typeof value === 'number' && value < 0 && -value % 1000 === 0;
  }
}
