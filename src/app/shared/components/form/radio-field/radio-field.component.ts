import { Component, Input } from '@angular/core';
import { FieldComponent } from '../field.component';

@Component({
  selector: 'app-radio-field',
  templateUrl: './radio-field.component.html',
  styleUrls: ['./radio-field.component.scss']
})
export class RadioFieldComponent extends FieldComponent {
  @Input() public items: { id: number | string; name: number | string }[];
}
