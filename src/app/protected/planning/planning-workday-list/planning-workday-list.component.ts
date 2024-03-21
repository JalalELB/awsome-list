import { Component, OnInit } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Component({
  selector: 'al-planning-workday-list',
  templateUrl: './planning-workday-list.component.html',
  styles: [
  ]
})
export class PlanningWorkdayListComponent implements OnInit {

  constructor() { }
  
  ngOnInit() { }

  onWorkdayRemoved(dueDate: string) {
    console.info(dueDate);
  }

}
