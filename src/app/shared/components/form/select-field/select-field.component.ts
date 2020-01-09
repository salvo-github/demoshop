import { Component, Input, OnInit } from '@angular/core';
import { FieldComponent } from '../field.component';

@Component({
  selector: 'app-select-field',
  templateUrl: './select-field.component.html',
  styleUrls: ['./select-field.component.scss']
})
export class SelectFieldComponent extends FieldComponent implements OnInit {
  @Input() items: { id: number | string; name: number | string }[];
  @Input() styleBackgroundColor: 'green' | 'white';
  public styleBackgroundColorClass = 'select--white select__arrow--green';

  ngOnInit() {
    if (this.styleBackgroundColor === 'green') {
      this.styleBackgroundColorClass = 'select--green select__arrow--white';
    }
    super.ngOnInit();
  }
}
