import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { LoginService } from '../user.service';

@Injectable({ providedIn: 'root' })
export class LoginGuardService implements CanActivate {
  constructor(private userService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUserSessionToken = this.userService.getCurrentUserSessionToken();

    if (currentUserSessionToken) {
      this.router.navigate(['/products-list']);
      return false;
    }

    return true;
  }
}
