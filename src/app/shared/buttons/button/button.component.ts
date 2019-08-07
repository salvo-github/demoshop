import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() public primary: string | boolean;
  @Input() public secondary: string | boolean;
  @Input() public regular: string | boolean;
  @Input() public big: string | boolean;
  @Input() public disabled: string | boolean;

  public constructor() {}

  public ngOnInit() {}

  public getState(prop: string): boolean {
    if (this[prop] === '') {
      return true;
    }
    return !!this[prop];
  }
}
