import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class ProductsGuardService implements CanLoad {
  constructor(private userService: UserService, private router: Router) {}

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
}
