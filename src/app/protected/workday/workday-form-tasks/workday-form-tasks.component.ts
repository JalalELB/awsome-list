import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'ntc-workday-form-tasks',
  templateUrl: './workday-form-tasks.component.html',
  styles: []
})
export class WorkdayFormTasksComponent implements OnInit {

  @Input() tasks: FormArray;
  @Input() workdayForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onAddedTask() {
    const taskGroup = this.createTaskGroup();
    this.tasks.push(taskGroup);
  }

  createTaskGroup(): FormGroup {
    return this.fb.group({
      'title': ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(150),
      ]],
      'todo': [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(5),
      ]],
      'done': 0,
    });
  }

  onRemovedTask(index: number) {
    this.tasks.removeAt(index);
  }

}
