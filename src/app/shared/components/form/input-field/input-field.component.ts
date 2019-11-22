import { Component, Input } from '@angular/core';
import { FieldComponent } from '../field.component';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent extends FieldComponent {
  @Input() public type = 'text';
}
