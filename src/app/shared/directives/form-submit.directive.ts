import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Directive({
  selector: 'form'
})
export class FormSubmitDirective {
  public submit$ = fromEvent(this.element, 'submit').pipe(shareReplay(1));

  public constructor(private host: ElementRef<HTMLFormElement>) {}

  public get element() {
    return this.host.nativeElement;
  }
}
