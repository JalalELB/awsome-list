import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/shared/models/task';

@Component({
  selector: 'al-workday-form-tasks',
  templateUrl: './workday-form-tasks.component.html',
  styles: [
  ]
})
export class WorkdayFormTasksComponent implements OnInit {
  
  @Input() workdayForm: FormGroup;
  @Input() tasks: FormArray;

  @Output() tasksOut = new EventEmitter<FormArray>();

  taskControlList: FormGroup[];
  isFirst: any;
  isLast: any;


  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
    this.tasks = this.tasks.length > 0 ? this.tasks : this.fb.array([]);
    this.taskControlList = this.tasks.controls as FormGroup[];
    this.workdayForm.get('tasks')?.valueChanges.subscribe(tasks => {
      this.tasks.clear();
      tasks.forEach((tsk: Task) => {
        const taskGroup: FormGroup = this.createTaskForm(tsk);
        this.tasks.push(taskGroup);
      });
    })
  }


  onAddedTask() {
    const taskGroup: FormGroup = this.createTaskForm(new Task());
    this.tasks.push(taskGroup);
    this.tasksOut.emit(this.tasks);
  }


  createTaskForm(task: Task): FormGroup {
		return this.fb.group({
			'title': [task?.title || '', [
				Validators.required,
				Validators.minLength(1),
				Validators.maxLength(150)
			]],
			'todo': [task?.todo || 1, [
				Validators.required,
				Validators.min(1),
				Validators.max(5)
			]],
			'done': task?.done || 0
		});
	}


  onRemovedTask($event: number) {
    this.tasks.removeAt($event);
  }


}  
