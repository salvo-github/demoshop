import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';

@Injectable({ providedIn: 'root' })
export class ProductsGuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  /**
   * @description
   * If the token it's invalid for the server a 404 error will be throw and managed in @see ErrorInterceptorService
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.validateToken().pipe(
      map((resp) => {
        return true;
      })
    );
  }

  /**
   * @description
   * The user must be an administrator to continue navigation
   */
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.isCurrentUserAdmin()) {
      return true;
    }

    // create an array of strings instead of urlSegment
    const backUrl = route.parent.url.map((urlSegment: UrlSegment) => {
      return urlSegment.path;
    });

    // https://github.com/angular/angular/issues/22763
    this.router.navigate(backUrl);
    return false;
  }
}
