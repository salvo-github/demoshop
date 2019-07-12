import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { LoginService } from '../user/user.service';
import { catchError, map, take } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsGuardService implements CanActivate {
  constructor(private userService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.validateToken().pipe(
      take(1),
      map((resp) => {
        return true;
      }),
      catchError((err) => {
        if (!err.status || err.status === 401) {
          this.userService.logout();
          return of(this.router.createUrlTree(['/login']));
        }
        if (err.status === 404) {
          return of(true);
        }
      })
    );
  }
}
