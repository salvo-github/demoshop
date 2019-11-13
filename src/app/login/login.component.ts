import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Subscription } from 'rxjs';
import { LoginFormFields } from '../shared/models/login-form-fields.model';
import { STRING_ENG_LETTERS } from '../services/form-errors.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isSubmitted = false;
  public loginFormFields = LoginFormFields;
  private loginSubscription: Subscription;

  public constructor(
    private userService: UserService,
    private router: Router
  ) {}

  public ngOnInit() {
    this.loginForm = new FormGroup({
      [this.loginFormFields.username]: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(STRING_ENG_LETTERS)
      ]),
      [this.loginFormFields.password]: new FormControl(null, [
        Validators.required
      ])
    });
  }

  public ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  protected onSubmit() {
    const username = this.loginForm.get(this.loginFormFields.username).value;
    const password = this.loginForm.get(this.loginFormFields.password).value;

    this.loginSubscription = this.userService
      .login(username, password)
      .subscribe(
        res => {
          this.router.navigate(['/']);
        },
        err => {
          if (err instanceof HttpErrorResponse && err.status === 400) {
            this.loginForm.reset();
            this.loginForm.markAllAsTouched();
            this.isSubmitted = true;
          } else {
            return throwError(err);
          }
        }
      );
  }
}
