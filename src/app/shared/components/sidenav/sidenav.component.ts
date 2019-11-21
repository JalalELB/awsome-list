import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../models/user';

@Component({
  selector: 'ntc-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  private prefix = 'app';
  private dashboardPath = `${this.prefix}/dashboard`;
  private planningPath = `${this.prefix}/planning`;
  private workdayPath = `${this.prefix}/workday`;
  private profilPath = `${this.prefix}/profil`;
  private parametersPath = `${this.prefix}/parameters`;
  private subscription: Subscription;
  private user: User;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.user$.subscribe(user =>
      this.user = user
      );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public isActive(page: string): boolean {
    return this.router.isActive(page, true);
  }

  public navigate(page: string): void {
    this.router.navigate([page]);
  }

}
