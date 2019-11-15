import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements OnInit {
  @Input() fieldName: string;
  @Input() validators: { [s: string]: boolean | string | RegExp };

  @Output() controllerCreated = new EventEmitter<FormControl>();

  public fieldControl: FormControl;

  constructor() {}

  ngOnInit() {
    this.fieldControl = new FormControl(
      null,
      this.getValidators(this.validators)
    );

    this.controllerCreated.emit(this.fieldControl);
  }

  private getValidators(validatorsConfig: {
    [s: string]: boolean | string | RegExp;
  }): ((control: AbstractControl) => ValidationErrors | ValidatorFn | null)[] {
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
        }
      }
    }
    return validatorsForInput;
  }
}
