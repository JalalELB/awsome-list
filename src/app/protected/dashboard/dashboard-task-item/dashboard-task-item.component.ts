import { Component, Input } from '@angular/core';
import { Task } from 'src/app/shared/models/task';

@Component({
  selector: 'al-dashboard-task-item',
  templateUrl: './dashboard-task-item.component.html',
  styleUrls: ['./dashboard-task-item.component.scss']
})
export class DashboardTaskItemComponent {

  @Input() task: Task;

}
