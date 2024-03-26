import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, finalize, of, switchMap, tap } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { ErrorService } from './error.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsersService } from './users.service';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';
import { ToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  readonly user$: Observable<User | null> = this.user.asObservable();


  constructor(
    private errorService: ErrorService,
    private http: HttpClient,
    private userService: UsersService,
    private loaderService: LoaderService,
    private toastrService: ToastrService,
    private router: Router,
  ) { }


  register(name: string, email: string, password: string): Observable<User | null> {

    this.loaderService.setLoading(true);

    const url: string = `${environment.firebaseConfig.auth.baseURL}/signupNewUser?key=${environment.firebaseConfig.apiKey}`;

    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    return this.http.post<User>(url, data, {}).pipe(
      switchMap((data: any) => {
        const jwt: string = data.idToken;
        const user = new User({
          email: data.email,
          id: data.localId,
          name: name
        });
        this.saveAuthData(data.localId, jwt);
        return this.userService.save(user);
      }),
      tap(user => this.user.next(user)),
      tap(_ => this.logoutTimer(3600)),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false)),
    );
  }


  login(email: string, password: string): Observable<User | null> {

    this.loaderService.setLoading(true);

    const url: string = `${environment.firebaseConfig.auth.baseURL}/verifyPassword?key=${environment.firebaseConfig.apiKey}`;

    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    return this.http.post<User>(url, data, {}).pipe(
      switchMap((data: any) => {
        const userId: string = data.localId;
        const jwt: string = data.idToken;
        this.saveAuthData(data.localId, jwt);
        return this.userService.get(userId);
      }),
      tap(user => this.user.next(user)),
      tap(_ => this.logoutTimer(3600)),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }


  updateUserState(user: User): Observable<User | null> {
    this.loaderService.setLoading(true);
    return this.userService.update(user).pipe(
      tap(user => this.user.next(user)),
      tap(_ => this.toastrService.showToastr({
        category: 'success',
        message: 'Votre modification a été effectuée avec succès',
      })),
      catchError(error => this.errorService.handleError(error)),
      finalize(() => this.loaderService.setLoading(false))
    );
  }


  get currentUser(): User | null {
    return this.user.getValue();
  }


  autoLogin(user: User) {
    this.user.next(user);
    this.router.navigate(['app/dashboard']);
  }


  logout(): void {
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.user.next(null);
    this.router.navigate(['/login']);
  }


  private logoutTimer(expirationTime: number): void {
    of(true).pipe(
      delay(expirationTime * 1000) // delay prend le paramétre en millisecondes donc on le multiplie * 1000
    ).subscribe(_ => this.logout);
  }


  private saveAuthData(userId: string, token: string) {
    const now = new Date();
    const expirationDate = (now.getTime() + 3600 * 1000).toString();
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
  }


}
