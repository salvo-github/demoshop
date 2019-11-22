import { Component, OnInit } from '@angular/core';
import { FieldComponent } from '../field.component';

@Component({
  selector: 'app-textarea-field',
  templateUrl: './textarea-field.component.html',
  styleUrls: ['./textarea-field.component.scss']
})
export class TextareaFieldComponent extends FieldComponent {}
