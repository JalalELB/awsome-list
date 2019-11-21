import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'src/app/core/services/toastr.service';

@Component({
  selector: 'ntc-workday-form',
  templateUrl: './workday-form.component.html',
  styles: []
})
export class WorkdayFormComponent implements OnInit {

  workdayForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.workdayForm = this.createWorkdayForm();
  }

  createWorkdayForm(): FormGroup {
    return this.fb.group({
      'dueDate': ['', [
        Validators.required,
      ]],
      'tasks': this.fb.array([], [
        Validators.required,
        Validators.maxLength(6),
      ]),
      'notes': ['', [
        Validators.maxLength(1000),
      ]]
    });
  }

  get dueDate() { return this.workdayForm.get('dueDate'); }
  get tasks() { return this.workdayForm.get('tasks') as FormArray; }
  get notes() { return this.workdayForm.get('notes'); }

  submit(): void {
    console.log(this.workdayForm.value);
  }

}
