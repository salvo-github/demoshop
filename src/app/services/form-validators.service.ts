import { InjectionToken } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

interface ValidatorsConfig {
  validator: string;
  validatorFlag: boolean | string | RegExp;
}

type ValidatorsTypes = ValidationErrors | ValidatorFn | null;

type ValidatorsCb = (control: AbstractControl) => ValidatorsTypes;

export const getValidators = (
  validatorsConfig: ValidatorsConfig
): ValidatorsCb[] => {
  const validatorsForInput: ValidatorsCb[] = [];

  for (const validator in validatorsConfig) {
    if (validatorsConfig.hasOwnProperty(validator)) {
      const validatorFlag = validatorsConfig[validator];

      const validatorObj: ValidatorsConfig = { validator, validatorFlag };

      if (isRequired(validatorObj)) {
        validatorsForInput.push(Validators.required);
      } else if (isPattern(validatorObj)) {
        validatorsForInput.push(
          Validators.pattern(validatorObj.validatorFlag as string | RegExp)
        );
      } else if (isCastToNumber(validatorObj)) {
        validatorsForInput.push(castToNumberValidator);
      }
    }
  }
  return validatorsForInput;
};

function isRequired(validatorObj: ValidatorsConfig): boolean {
  return (
    validatorObj.validator === 'required' && validatorObj.validatorFlag === true
  );
}

function isPattern(validatorObj: ValidatorsConfig): boolean {
  return (
    validatorObj.validator === 'pattern' &&
    validatorObj.validatorFlag &&
    (typeof validatorObj.validatorFlag === 'string' ||
      validatorObj.validatorFlag instanceof RegExp)
  );
}

function isCastToNumber(validatorObj: ValidatorsConfig): boolean {
  return (
    validatorObj.validator === 'castToNumberValidator' &&
    validatorObj.validatorFlag === true
  );
}

// check if a value can be parsed to float and transform it, otherwise throw an error
function castToNumberValidator(
  control: AbstractControl
): ValidationErrors | null {
  if (control.value !== '' && typeof control.value !== 'number') {
    const value = parseFloat(control.value);
    if (value.toString() !== 'NaN') {
      control.setValue(value);
      return null;
    } else {
      return { mustBeNumber: true };
    }
  }
  return null;
}

export const FOMR_VALIDATORS = new InjectionToken('FOMR_VALIDATORS', {
  providedIn: 'root',
  factory: () => getValidators
});
