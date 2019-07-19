import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProductsGuardService implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.validateToken().pipe(
      map((resp) => {
        return true;
      }),
      catchError((err) => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.userService.logout();
          this.router.navigate(['/login']);
        }
        return EMPTY;
      })
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.userService.isCurrentUserAdmin()) {
      return true;
    } else {
      // create an array of strings instead of urlSegment
      const backUrl = route.parent.url.map((urlSegment: UrlSegment) => {
        return urlSegment.path;
      });
      // https://github.com/angular/angular/issues/22763
      this.router.navigate(backUrl);
      return false;
    }
  }
}
