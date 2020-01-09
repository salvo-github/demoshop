import { EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { FOMR_VALIDATORS } from 'src/app/services/form-validators.service';

export class FieldComponent implements OnInit {
  @Input() initValue: any = null;
  @Input() fieldName: string;
  @Input() validators: { [s: string]: boolean | string | RegExp };
  @Input() additionalInputClass: string;

  @Output() controllerCreated = new EventEmitter<FormControl>();

  public fieldControl: FormControl;

  constructor(
    @Inject(FOMR_VALIDATORS)
    private formValidators: (validatorsConfig: {
      [s: string]: boolean | string | RegExp;
    }) => ((
      control: AbstractControl
    ) => ValidationErrors | ValidatorFn | null)[]
  ) {}

  ngOnInit() {
    this.fieldControl = new FormControl(
      this.initValue,
      this.formValidators(this.validators)
    );

    this.controllerCreated.emit(this.fieldControl);
  }
}
