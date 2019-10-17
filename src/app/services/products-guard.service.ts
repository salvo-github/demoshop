import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class ProductsGuardService implements CanLoad {
  constructor(private userService: UserService, private router: Router) {
    console.log('guard created');
  }

  /**
   * @description
   * If the token it's invalid for the server a 404 error will be throw and managed in @see ErrorInterceptorService
   */
  canLoad(): Observable<boolean> {
    return this.userService.validateToken().pipe(
      map(resp => {
        return true;
      }),
      catchError(error => {
        return of(false);
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
