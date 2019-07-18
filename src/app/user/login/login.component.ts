import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.scss',
    '../../../assets/scss/mediaquery.scss',
    '../../../assets/scss/modal.scss',
    '../../../assets/scss/form/form.scss'
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isSubmitted = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[A-Za-z]+$')
      ]),
      password: new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.userService.login(username, password).subscribe(
      (res) => {
        this.router.navigate(['/']);
      },
      (err) => {
        this.loginForm.reset();
        this.loginForm.markAllAsTouched();
        this.isSubmitted = true;
      }
    );
  }
}
