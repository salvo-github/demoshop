import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagePlaceholderDirective } from './directives/image-placeholder.directive';
import { ControlErrorsDirective } from './directives/control-errors.directive';
import { FormSubmitDirective } from './directives/form-submit.directive';
import { ControlErrorComponent } from './components/control-error/control-error.component';
import { ControlErrorContainerDirective } from './directives/control-error-container.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ProductAvailabilityPipe } from './pipes/product-availability.pipe';
import { InputFieldComponent } from './components/form/input-field/input-field.component';

@NgModule({
  declarations: [
    ImagePlaceholderDirective,
    ControlErrorsDirective,
    FormSubmitDirective,
    ControlErrorComponent,
    ControlErrorContainerDirective,
    ClickOutsideDirective,
    ProductAvailabilityPipe,
    InputFieldComponent
  ],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [
    ReactiveFormsModule,
    ImagePlaceholderDirective,
    ControlErrorsDirective,
    FormSubmitDirective,
    ControlErrorContainerDirective,
    ClickOutsideDirective,
    ProductAvailabilityPipe,
    InputFieldComponent
  ],
  entryComponents: [ControlErrorComponent]
})
export class SharedModule {}
