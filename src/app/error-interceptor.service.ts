import { Location } from '@angular/common';
import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { emptyScheduled } from 'rxjs/internal/observable/empty';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptorService implements HttpInterceptor {
  [x: string]: any;
  constructor(private router: Router, private location: Location) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((err) => {
        const path = this.location.path();

        if (err instanceof HttpErrorResponse) {
          if (err.status === 404) {
            this.router.navigate(['/page-not-found'], {
              skipLocationChange: true
            });
            this.redirect(path);
            return EMPTY;
          }
          if (err.status >= 500 || err.status === 0) {
            this.router.navigate(['/server-error'], {
              skipLocationChange: true
            });
            this.redirect(path);
            return EMPTY;
          }
        }
        return throwError(err);
      })
    );
  }

  redirect(path: string) {
    // https://github.com/angular/angular/issues/16981
    setTimeout(() => {
      this.location.replaceState(path);
    });
  }
}
