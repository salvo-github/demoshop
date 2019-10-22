import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Host,
  HostListener,
  Inject,
  OnInit,
  Optional,
  ViewContainerRef,
  ElementRef
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { EMPTY, merge, Observable, fromEvent } from 'rxjs';
import { FORM_ERRORS } from 'src/app/services/form-errors.service';
import { ControlErrorComponent } from '../components/control-error/control-error.component';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { FormSubmitDirective } from './form-submit.directive';

@Directive({
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit {
  private submit$: Observable<Event>;
  private ref: { [s: string]: ComponentRef<ControlErrorComponent> } = {};
  private container: ViewContainerRef;
  private onBlur$ = fromEvent(this.element, 'blur');

  @HostListener('focus') private onHover() {
    if (this.ref) {
      this.removeErrors();
    }
  }

  @HostListener('blur') private onBlur() {
    if (this.ref) {
      this.checkErrors();
    }
  }

  public constructor(
    private control: NgControl,
    @Inject(FORM_ERRORS) private error: { [k: string]: (arg) => string },
    @Optional() @Host() private form: FormSubmitDirective,
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    @Optional() controlErrorContainer: ControlErrorContainerDirective,
    private host: ElementRef<HTMLInputElement>
  ) {
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
  }

  private get element() {
    return this.host.nativeElement;
  }

  public ngOnInit() {
    merge(this.onBlur$, this.submit$).subscribe(() => {
      this.checkErrors();
    });
  }

  private checkErrors(): void {
    this.removeErrors();

    const controlErrors = this.control.errors;
    if (controlErrors) {
      for (const key in controlErrors) {
        if (controlErrors.hasOwnProperty(key)) {
          const getError = this.error[key];
          const text = getError(controlErrors[key]);
          this.setError(text, key);
        }
      }
    } else if (this.ref) {
      this.setError(null);
    }
  }

  private setError(text: string, key?: string) {
    if (!this.ref[key]) {
      const factory = this.resolver.resolveComponentFactory(
        ControlErrorComponent
      );
      const dynCompRef = this.container.createComponent(factory);
      dynCompRef.instance.text = text;
      this.ref[key] = dynCompRef;
    } else {
      this.ref[key].instance.text = text;
    }
  }

  private removeErrors(): void {
    for (const key in this.ref) {
      if (this.ref.hasOwnProperty(key)) {
        (this.ref[key] as ComponentRef<ControlErrorComponent>).destroy();
        delete this.ref[key];
      }
    }
  }
}
