import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class ImagePlaceholderDirective implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {}

  @HostListener('error') onError() {
    this.renderer.setAttribute(
      this.el.nativeElement,
      'src',
      '/assets/img/imgholdr-image.png'
    );
  }
}
