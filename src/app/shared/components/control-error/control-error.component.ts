import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlErrorComponent {
  public _text: string;
  public _hide = true;

  @Input() public set text(value: string) {
    if (value !== this.text) {
      this._text = value;
      this._hide = !value;
      this.cdr.detectChanges();
    }
  }

  public constructor(private cdr: ChangeDetectorRef) {}
}
