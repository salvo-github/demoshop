import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserRole } from './user-role.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /** Used as key */
  private sessionTokenSessionId = 'session-token';
  /** Used as key */
  private currentUserUsernameSessionId = 'current-user-username';
  /** Used as key */
  private currentUserRoleIdSessionId = 'current-user-role';

  public constructor(private http: HttpClient, private router: Router) {}

  /**
   * @description
   * If it's successful retrieve the session token
   */
  public login(login: string, password: string) {
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
          console.log(res);
          const sessionToken = res.headers.get(this.sessionTokenSessionId);

          localStorage.setItem(this.sessionTokenSessionId, sessionToken);
          localStorage.setItem(this.currentUserUsernameSessionId, login);

          /** Used to retrieve the user role id because the login API returns only the session token */
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

  public getCurrentUserSessionToken(): string | null {
    return localStorage.getItem(this.sessionTokenSessionId);
  }

  public getCurrentUserUsername(): string | null {
    return localStorage.getItem(this.currentUserUsernameSessionId);
  }

  public getSessionTokenId(): string {
    return this.sessionTokenSessionId;
  }

  public logout(): void {
    this.http
      .post(
        'http://localhost:3000/api/logout',
        {
          login: this.getCurrentUserUsername()
        },
        {
          observe: 'response',
          responseType: 'text'
        }
      )
      .subscribe((resp) => {
        this.invalidateUserInfoFromLocalStorage();
        this.router.navigate(['/login']);
      });
  }

  public invalidateUserInfoFromLocalStorage(): void {
    localStorage.removeItem(this.sessionTokenSessionId);
    localStorage.removeItem(this.currentUserUsernameSessionId);
    localStorage.removeItem(this.currentUserRoleIdSessionId);
  }

  public isCurrentUserAdmin(): boolean {
    const currentUserRoleId = parseFloat(
      localStorage.getItem(this.currentUserRoleIdSessionId)
    );

    return currentUserRoleId === UserRole.admin;
  }

  /**
   * @description
   * The server doesn't have a dedicated API to check the token validity.
   * If the current user token it's not valid the serve returns 401.
   * Based on that the user will be redirect to login page, otherwise he will be able to continue to the route
   */
  public validateToken(): Observable<UserRole> {
    // I use the `roles` endpoint to validate the token because the server doesn't have the proper endpoint
    return this.http.get<UserRole>('http://localhost:3000/api/roles/0');
  }
}
