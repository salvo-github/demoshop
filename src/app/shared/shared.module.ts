import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagePlaceholderDirective } from './directives/image-placeholder.directive';

@NgModule({
  declarations: [ImagePlaceholderDirective],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [ReactiveFormsModule]
})
export class SharedModule {}
