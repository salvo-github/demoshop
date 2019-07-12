import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../user.model';
import { UserRole } from '../user-role.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private sessionTokenSessionId = 'session-token';
  private currentUserUsernameSessionId = 'current-user-username';
  private currentUserRoleIdSessionId = 'current-user-role';
  currentUser: User;

  constructor(private http: HttpClient) {}

  login(login: string, password: string) {
    return this.http
      .post(
        'http://localhost:3000/api/login',
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
          const sessionToken = res.headers.get(this.sessionTokenSessionId);

          localStorage.setItem(this.sessionTokenSessionId, sessionToken);
          localStorage.setItem(this.currentUserUsernameSessionId, login);

          this.http
            .get<User[]>(`http://localhost:3000/api/users?login=${login}`)
            .subscribe((userData) => {
              localStorage.setItem(
                this.currentUserRoleIdSessionId,
                '' + userData[0].roleId
              );
            });
        })
      );
  }

  getCurrentUserSessionToken(): string | null {
    return localStorage.getItem(this.sessionTokenSessionId);
  }

  getCurrentUserUsername(): string | null {
    return localStorage.getItem(this.currentUserUsernameSessionId);
  }

  getSessionTokenId() {
    return this.sessionTokenSessionId;
  }

  logout() {
    localStorage.removeItem(this.sessionTokenSessionId);
    localStorage.removeItem(this.currentUserUsernameSessionId);
  }

  isCurrentUserAdmin(): boolean {
    const currentUserRoleId = +localStorage.getItem(
      this.currentUserRoleIdSessionId
    );

    return currentUserRoleId === UserRole.admin;
  }

  getCurrentUserRole(): null | number {
    return;
  }

  validateToken() {
    return this.http.get('http://localhost:3000/api');
  }
}
