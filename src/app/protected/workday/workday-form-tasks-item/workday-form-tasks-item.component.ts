import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ntc-workday-form-tasks-item',
  templateUrl: './workday-form-tasks-item.component.html',
  styleUrls: ['./workday-form-tasks-item.component.scss']
})
export class WorkdayFormTasksItemComponent implements OnInit {

  @Input() task: FormGroup;
  @Input() index: number;
  @Input() isFirst: boolean;
  @Input() isLast: boolean;

  @Output() removedTask = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  removeTask(index: number) {
    this.removedTask.emit(index);
  }

}
