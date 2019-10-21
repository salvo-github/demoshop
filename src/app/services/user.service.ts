import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { UserRole } from '../shared/models/user-role.model';
import { User } from '../shared/models/user.model';

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

  private currentUserUsername$ = new BehaviorSubject<string | null>(
    localStorage.getItem(this.currentUserUsernameSessionId)
  );

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
        tap(res => {
          const sessionToken = res.headers.get(this.sessionTokenSessionId);
          localStorage.setItem(this.sessionTokenSessionId, sessionToken);
          localStorage.setItem(this.currentUserUsernameSessionId, login);
          this.currentUserUsername$.next(login);
        }),
        switchMap(res =>
          this.http
            .get<User[]>(`http://localhost:3000/api/users?login=${login}`)
            .pipe(
              map(userData => {
                localStorage.setItem(
                  this.currentUserRoleIdSessionId,
                  String(userData[0].roleId)
                );

                return res;
              })
            )
        )
      );
  }

  public getCurrentUserSessionToken(): string | null {
    return localStorage.getItem(this.sessionTokenSessionId);
  }

  public getCurrentUserUsername(): Observable<string | null> {
    return this.currentUserUsername$.asObservable();
  }

  public getSessionTokenId(): string {
    return this.sessionTokenSessionId;
  }

  public logout(): Promise<void> {
    const login = this.currentUserUsername$.getValue();

    if (!login) {
      this.invalidateUserInfo();
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      this.http
        .post(
          'http://localhost:3000/api/logout',
          {
            login
          },
          {
            observe: 'response',
            responseType: 'text'
          }
        )
        .toPromise()
        .then(resp => {
          this.invalidateUserInfo();
          resolve();
        });
    });
  }

  public invalidateUserInfo(): void {
    this.currentUserUsername$.next(null);
    this.invalidateUserInfoFromLocalStorage();
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
