import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ntc-workday-form-tasks-add',
  templateUrl: './workday-form-tasks-add.component.html',
  styles: []
})
export class WorkdayFormTasksAddComponent implements OnInit {

  @Output() addedTask = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  addTask() {
    this.addedTask.emit();
  }

}
