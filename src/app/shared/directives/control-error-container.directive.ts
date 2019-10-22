import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appControlErrorContainer]'
})
export class ControlErrorContainerDirective {
  public constructor(public vcr: ViewContainerRef) {}
}
