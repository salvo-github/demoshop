import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from './login/login.service';

@Injectable({ providedIn: 'root' })
export class UserAuthInterceptorService implements HttpInterceptor {
  constructor(private loginService: LoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.indexOf('login') === -1) {
      const sessionTokenId = this.loginService.getSessionTokenId();
      const currentUserSessionToken: string = this.loginService.getCurrentUserSessionToken();

      const modfiedReq = req.clone({
        headers: req.headers.append(sessionTokenId, currentUserSessionToken)
      });
      return next.handle(modfiedReq);
    }
    return next.handle(req);
  }
}
