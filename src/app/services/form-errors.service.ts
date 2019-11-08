import { InjectionToken } from '@angular/core';

export const defaultErrors = {
  required: error => 'The field is required',
  minlength: ({ requiredLength, actualLength }) =>
    `The field must contains at least ${requiredLength} letters`,
  pattern: ({ requiredPattern, actualValue }) => {
    switch (requiredPattern) {
      case '^[A-Za-z]+$':
        return 'The field must contains only English letters';
      default:
        break;
    }
  }
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
