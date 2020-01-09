import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlErrorComponent } from './components/control-error/control-error.component';
import { CheckboxFieldComponent } from './components/form/checkbox-field/checkbox-field.component';
import { InputFieldComponent } from './components/form/input-field/input-field.component';
import { RadioFieldComponent } from './components/form/radio-field/radio-field.component';
import { SelectFieldComponent } from './components/form/select-field/select-field.component';
import { TextareaFieldComponent } from './components/form/textarea-field/textarea-field.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ControlErrorContainerDirective } from './directives/control-error-container.directive';
import { ControlErrorsDirective } from './directives/control-errors.directive';
import { FormSubmitDirective } from './directives/form-submit.directive';
import { ImagePlaceholderDirective } from './directives/image-placeholder.directive';
import { ProductAvailabilityPipe } from './pipes/product-availability.pipe';

const sharedComponents = [
  ImagePlaceholderDirective,
  ControlErrorsDirective,
  FormSubmitDirective,
  ControlErrorContainerDirective,
  ClickOutsideDirective,
  ProductAvailabilityPipe,
  InputFieldComponent,
  SelectFieldComponent,
  RadioFieldComponent,
  TextareaFieldComponent,
  CheckboxFieldComponent
];

@NgModule({
  declarations: [sharedComponents, ControlErrorComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [sharedComponents, ReactiveFormsModule],
  entryComponents: [ControlErrorComponent]
})
export class SharedModule {}
