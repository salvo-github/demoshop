import { InjectionToken } from '@angular/core';

export const STRING_ENG_LETTERS = '^[A-Za-z]+$';

export const REG_EXP_URL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const defaultErrors = {
  required: error => 'The field is required',
  minlength: ({ requiredLength, actualLength }) =>
    `The field must contains at least ${requiredLength} letters`,
  mustBeNumber: error => 'The field must contains a number',
  pattern: ({ requiredPattern, actualValue }) => {
    switch (requiredPattern) {
      case STRING_ENG_LETTERS:
        return 'The field must contains only English letters';
      case String(REG_EXP_URL):
        return 'This must be an url';
      default:
        break;
    }
  }
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});
