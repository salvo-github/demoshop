import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { LoginService } from '../user/login/login.service';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductsGuardService implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | boolean | UrlTree {
    return this.loginService.validateToken().pipe(
      map((resp) => {
        return true;
      }),
      catchError((err) => {
        if (err.status === 401) {
          this.loginService.logout();
          return of(this.router.createUrlTree(['/login']));
        }
        if (err.status === 404) {
          return of(true);
        }
      })
    );
  }
}
