import { Injectable, ErrorHandler } from '@angular/core';
import { environment } from '../../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserInterface } from '../../../interfaces/UserInterface';
import { UserLogInInterface } from '../../../interfaces/UserLogInInterface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private route: Router
  ) {
    this.headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
  }

  LogIn(User: UserInterface): Observable<UserLogInInterface> {
    return this.http.post<UserLogInInterface>(environment.API_BASE + '/user/login', User, {
      headers: this.headers
    });
  }

  setLogIn(User: UserInterface, token: string): void {
    this.cookieService.set(environment.USER_KEY, JSON.stringify(User));
    localStorage.setItem(environment.TOKEN_USER, token);
    this.route.navigateByUrl('/home');
  }

  IsLogged(): boolean {
    if (this.cookieService.check(environment.USER_KEY)) {
      return true;
    }
    return false;
  }

 getUser(): any {
    try {
      return JSON.parse(this.cookieService.get(environment.USER_KEY));
    } catch (error) {
      return error;
    }
  }

  getToken(): string {
    try {
      return localStorage.getItem(environment.TOKEN_USER);
    } catch (error) {
      return JSON.stringify(error);
    }
  }

  Logout(): void {
    this.cookieService.delete(environment.USER_KEY, '');
    localStorage.removeItem(environment.TOKEN_USER);
    this.route.navigateByUrl('/login');
  }

  createUser(User: UserInterface): Observable<boolean> {
    return this.http.post<boolean>(environment.API_BASE + '/user/create', User, {
      headers: this.headers
    });
  }

  readUser(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(environment.API_BASE + '/user', {
      headers: this.headers
    });
  }

  readUserById(UserId: number): Observable<UserInterface> {
    return this.http.get<UserInterface>(environment.API_BASE + '' + UserId, {
      headers: this.headers
    });
  }

  updateUser(User: UserInterface): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '/user/update', User, {
      headers: this.headers
    });
  }

  deleteUser(User: UserInterface): Observable<any> {
    return this.http.post<any>(environment.API_BASE + '/user/delete', User, {
      headers: this.headers
    });
  }
}
