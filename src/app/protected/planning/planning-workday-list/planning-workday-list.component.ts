import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';
import { Workday } from 'src/app/shared/models/workday';

@Component({
  selector: 'ntc-planning-workday-list',
  templateUrl: './planning-workday-list.component.html',
  styles: []
})
export class PlanningWorkdayListComponent implements OnInit {

  public workdays$;
  public workdays;

  constructor() { }

  ngOnInit() {
    this.workdays = [
      { dueDate: 'Lundi', doneTasks: 4, remainingTasks: 0 },
      { dueDate: 'Mardi', doneTasks: 0, remainingTasks: 4 },
      { dueDate: 'Mercredi', doneTasks: 2, remainingTasks: 3 },
      { dueDate: 'Jeudi', doneTasks: 4, remainingTasks: 0 },
      { dueDate: 'Vendredi', doneTasks: 0, remainingTasks: 4 },
      { dueDate: 'Samedi', doneTasks: 2, remainingTasks: 3 },
      { dueDate: 'Dimanche', doneTasks: 4, remainingTasks: 0 },
    ];

    this.workdays$ = of(this.workdays).pipe(delay(1000));
  }

  onWorkdayRemoved(dueDate: string) {
    this.workdays = this.workdays.filter(workday =>
      !dueDate.includes(workday.dueDate)
    );
    this.workdays$ = of(this.workdays);
  }

}
