import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private sessionTokenId = 'session-token';
  private currentUserUsernameId = 'current-user-username';

  constructor(private http: HttpClient) {}

  login(login: string, password: string) {
    return this.http
      .post(
        ' http://localhost:3000/api/login',
        {
          login,
          password
        },
        {
          observe: 'response',
          responseType: 'text'
        }
      )
      .pipe(
        tap((res) => {
          const sessionToken = res.headers.get(this.sessionTokenId);

          localStorage.setItem(this.sessionTokenId, sessionToken);
          localStorage.setItem(this.currentUserUsernameId, login);
        })
      );
  }

  getCurrentUserSessionToken(): string | null {
    return localStorage.getItem(this.sessionTokenId);
  }

  getCurrentUserUsername(): string | null {
    return localStorage.getItem(this.currentUserUsernameId);
  }

  getSessionTokenId() {
    return this.sessionTokenId;
  }
}
