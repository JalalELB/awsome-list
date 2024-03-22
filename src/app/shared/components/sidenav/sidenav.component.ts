import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'al-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  prefix: string = 'app';
  dashboardPath: string = `${this.prefix}/dashboard`;
  planningPath: string = `${this.prefix}/planning`;
  workdayPath: string = `${this.prefix}/workday`;
  profilPath: string = `${this.prefix}/profil`;
  parametersPath: string = `${this.prefix}/parameters`;

  subscription: Subscription;
  user: User | null;


  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }


  ngOnInit(): void {
    this.subscription = this.authService.user$.subscribe(user => this.user = user);
  }
  
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  public isActive(page: string): boolean {
    return this.router.isActive(page, { paths: 'exact', queryParams: 'exact', fragment: 'ignored', matrixParams: 'ignored' });
  }


  public navigate(page: string): void {
    this.router.navigate([page]);
  }


}
