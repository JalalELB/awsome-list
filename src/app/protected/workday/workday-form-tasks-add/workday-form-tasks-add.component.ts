import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'al-workday-form-tasks-add',
  templateUrl: './workday-form-tasks-add.component.html',
  styles: [
  ]
})
export class WorkdayFormTasksAddComponent {

  @Output() addedTask = new EventEmitter<void>();

  addTask(): void {
    this.addedTask.emit();
  }

}
