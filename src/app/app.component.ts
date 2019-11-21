import { Component, OnInit } from '@angular/core';
import { UsersService } from './core/services/users.service';
import { AuthService } from './core/services/auth.service';
import { User } from './shared/models/user';

@Component({
  selector: 'ntc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.tryAutoLogin();
  }

  private tryAutoLogin() {

    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const expirationDate = +localStorage.getItem('expirationDate');
    const now = new Date().getTime();
    if (now >= expirationDate) {
      return;
    }

    const userId = localStorage.getItem('userId');
    this.usersService.get(userId, token).subscribe(user => {
      this.authService.autoLogin(user);
    });
  }



}
