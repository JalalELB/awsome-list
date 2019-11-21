import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, tap, catchError, finalize, delay } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user';
import { UsersService } from './users.service';
import { ErrorService } from './error.service';
import { LoaderService } from './loader.service';
import { ToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private user: BehaviorSubject<User | null> = new BehaviorSubject(null);
  public readonly user$: Observable<User> = this.user.asObservable();


  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private errorService: ErrorService,
    private loaderService: LoaderService,
    private toastService: ToastrService,
    private router: Router,
  ) { }


  public login(email: string, password: string): Observable<User | null> {
    this.loaderService.setLoading(true);
    const url = `${environment.firebase.auth.baseURL}/verifyPassword?key=${environment.firebase.apiKey}`;
    const data = {
      email,
      password,
      returnSecureToken: true,
    };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<User>(url, data, httpOptions).pipe(
      switchMap((data: any) => {
        const userId: string = data.localId;
        const jwt: string = data.idToken;
        this.saveAuthData(userId, jwt);
        return this.usersService.get(userId, jwt);
      }),
      tap(user => this.user.next(user)),
      tap(_ => this.logoutTimer(3600)),
      catchError(error => this.errorService.handleError(error)),
      finalize(() =>
        this.loaderService.setLoading(false)
      )
    );
  }


  public connect(user: User): void {
    this.user = new BehaviorSubject(user);
  }


  public register(name: string, email: string, password: string): Observable<User | null> {
    this.loaderService.setLoading(true);
    const url = `${environment.firebase.auth.baseURL}/signupNewUser?key=${environment.firebase.apiKey}`;
    const data = {
      email,
      password,
      returnSecureToken: true,
    };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(url, data, httpOptions).pipe(
      switchMap((data: any) => {
        const jwt: string = data.idToken;
        const user = new User({
          email: data.email,
          id: data.localId,
          name,
        });
        this.saveAuthData(user.id, jwt);
        return this.usersService.save(user, jwt);
      }
      ),
      tap(user => this.user.next(user)),
      tap(_ => this.logoutTimer(3600)),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false)),
    );
  }

  public updateUserState(user: User): Observable<User | null> {
    this.loaderService.setLoading(true);
    return this.usersService.update(user).pipe(
      tap(user => this.user.next(user)),
      tap(_ => this.toastService.showToastr({
        category: 'success',
        message: 'Vos informations ont été mises à jour !',
      })),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }


  public get currentUser(): User {
    return this.user.getValue();
  }


  public logout(): void {
    this.user.next(null);
    this.router.navigate(['/login']);
  }


  public autoLogin(user: User) {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    this.user.next(user);
    this.router.navigate(['/app/dashboard']);
  }
  


  private saveAuthData(userId: string, token: string) {
    const now = new Date();
    const expirationDate = (now.getTime() + 3600 * 1000).toString();
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }
  


  private logoutTimer(expirationTime: number): void {
    of(true).pipe(
      delay(expirationTime * 1000)
    )
      .subscribe(_ => this.logout());
  }

}
