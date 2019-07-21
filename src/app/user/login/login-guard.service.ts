import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { UserService } from '../user.service';

@Injectable({ providedIn: 'root' })
export class LoginGuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  /**
   * @description
   * If the session token for the current user exist he can't navigate to login page
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUserSessionToken = this.userService.getCurrentUserSessionToken();

    if (currentUserSessionToken) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
