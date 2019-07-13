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
      const sessionTokenId = this.userService.getSessionTokenId();
      const currentUserSessionToken: string = this.userService.getCurrentUserSessionToken();

      const modfiedReq = req.clone({
        headers: req.headers.append(sessionTokenId, currentUserSessionToken)
      });
      return next.handle(modfiedReq);
    }
    return next.handle(req);
  }
}
