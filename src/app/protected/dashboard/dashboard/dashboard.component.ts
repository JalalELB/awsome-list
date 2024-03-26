import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { DateService } from 'src/app/core/services/date.service';
import { WorkdaysService } from 'src/app/core/services/workdays.service';
import { User } from 'src/app/shared/models/user';
import { Workday } from 'src/app/shared/models/workday';

@Component({
  selector: 'al-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  currentDate: string;
  currentUser: User | null;
  workday$: Observable<Workday | null>;

  constructor(
    private authService: AuthService,
    private workdaysService: WorkdaysService,
    private dateService: DateService) { }

  ngOnInit() {
    this.currentDate = this.dateService.getDisplayDate(new Date());
    this.currentUser = this.authService.currentUser;
    if (this.currentUser && this.currentUser.id) {
      this.workday$ = this.workdaysService.getWorkdayByDate(this.currentDate, this.currentUser.id);
    }
  }

}
