import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class UserAuthInterceptorService implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.indexOf('/login') === -1) {
      const currentUserSessionToken: string = this.userService.getCurrentUserSessionToken();

      // https://stackoverflow.com/questions/50213883/angular-typeerror-cannot-read-property-length-of-null-in-promise-subscribe
      if (currentUserSessionToken !== null) {
        const sessionTokenId = this.userService.getSessionTokenId();
        req = req.clone({
          headers: req.headers.append(sessionTokenId, currentUserSessionToken)
        });
      }
    }
    return next.handle(req);
  }
}
