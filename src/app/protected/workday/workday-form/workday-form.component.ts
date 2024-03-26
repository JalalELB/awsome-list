import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { WorkdaysService } from 'src/app/core/services/workdays.service';
import { User } from 'src/app/shared/models/user';
import { Workday } from 'src/app/shared/models/workday';

@Component({
  selector: 'al-workday-form',
  templateUrl: './workday-form.component.html',
  styles: [
  ]
})
export class WorkdayFormComponent implements OnInit {

  workdayId: string;
  workdayForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private workdaysService: WorkdaysService,
    private authService: AuthService,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.workdayId = '';
      this.workdayForm = this.createWorkdayForm();
      if (params['date']) {
        const date: Date = new Date(+params['date'] * 1000); // On multiplie par 1000 le timestamp reçu pour l'adapter au format des timestamp de JavaScript.
        this.dueDate.setValue(date);
      }
    });
  }


  get dueDate() { return this.workdayForm.get('dueDate') as FormControl; }
  get notes() { return this.workdayForm.get('notes') as FormControl; }
  get tasks() { return this.workdayForm.get('tasks') as FormArray; }


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
      ]],
    });

  }

  resetWorkdayForm() {
    while (this.tasks.value.length !== 0) {
      this.tasks.value.removeAt(0);
    }
    this.notes.reset();
  }


  tasksIn(tasks: FormArray) {
    this.workdayForm.setControl('tasks', tasks);
  }


  submit(): void {
    const user: User | null = this.authService.currentUser;

    if (!(user && user.id)) {
      return;
    }

    // Update workday
    if (this.workdayId) {
      const workdayToUpdate: Workday = new Workday({ ...this.workdayForm.value, userId: user.id, id: this.workdayId });

      this.workdaysService.update(workdayToUpdate).subscribe({
        next: () => this.router.navigate(['/app/planning']),
        error: () => this.workdayForm.reset()
      });
      return;
    }



    const workday: Workday = new Workday({ ...this.workdayForm.value, userId: user.id });
    this.workdaysService.save(workday).subscribe({
      next: () => this.router.navigate(['/app/planning']),
      error: () => this.workdayForm.reset()
    });

  }

  onDateSelected(displayDate: string) {
    const user: User | null = this.authService.currentUser; // On va récupérer la journée de travail par date pour l'utilisateur courant seulement.

    if (user && user.id) {
      this.workdaysService.getWorkdayByDate(displayDate, user.id).subscribe(workday => {
        this.resetWorkdayForm(); // On réinitialise le formulaire d'une journée de travail.
        if (!workday) return; // Si cette journée de travail n'existe pas sur le Firestore, alors on s'arrête là.

        this.workdayId = workday.id as string;
        this.notes.setValue(workday.notes);

        workday.tasks.forEach(task => {
          const taskField: FormGroup = this.fb.group({
            title: task.title,
            todo: task.todo,
            done: task.done
          });
          this.tasks.push(taskField);
        });
        this.workdayForm.setControl('tasks', this.tasks);
      });
    }
  }


}
