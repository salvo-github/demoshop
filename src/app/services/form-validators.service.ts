import { InjectionToken } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

export const getValidators = (validatorsConfig: {
  [s: string]: boolean | string | RegExp;
}): ((control: AbstractControl) => ValidationErrors | ValidatorFn | null)[] => {
  const validatorsForInput: ((
    control: AbstractControl
  ) => ValidationErrors | ValidatorFn | null)[] = [];

  for (const validator in validatorsConfig) {
    if (validatorsConfig.hasOwnProperty(validator)) {
      const validatorFlag = validatorsConfig[validator];

      if (validator === 'required' && validatorFlag === true) {
        validatorsForInput.push(Validators.required);
      } else if (
        (validator === 'pattern' &&
          validatorFlag &&
          typeof validatorFlag === 'string') ||
        validatorFlag instanceof RegExp
      ) {
        validatorsForInput.push(Validators.pattern(validatorFlag));
      } else if (
        validator === 'castToNumberValidator' &&
        validatorFlag === true
      ) {
        validatorsForInput.push(castToNumberValidator);
      }
    }
  }
  return validatorsForInput;
};

// transform the value
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
