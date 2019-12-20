import { Component, Input } from '@angular/core';
import { FieldComponent } from '../field.component';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent extends FieldComponent {
  @Input() items: { id: number | string; name: number | string }[];
  @Input() styleBackgroundColor: 'green' | 'white';
}
