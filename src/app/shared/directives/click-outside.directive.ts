import {
  AfterViewChecked,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective implements OnInit, AfterViewChecked {
  private firstClick = true;

  constructor(private elementRef: ElementRef) {}

  @Output()
  public appClickOutside = new EventEmitter<MouseEvent>();

  ngOnInit() {}

  ngAfterViewChecked() {}

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement || this.firstClick) {
      this.firstClick = false;
      return;
    }

    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.appClickOutside.emit(event);
    }
  }
}
