import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  public canActivate(): Observable<boolean> {

    return this.authService.user$.pipe(
      map(user => !!user),
      tap(isLogged => {
        if (!isLogged) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }

  public canActivateChild(): Observable<boolean> {
    return this.canActivate();
  }
}
