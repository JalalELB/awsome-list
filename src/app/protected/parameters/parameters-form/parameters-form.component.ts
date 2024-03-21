import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'al-parameters-form',
  templateUrl: './parameters-form.component.html',
  styles: [
  ]
})
export class ParametersFormComponent implements OnInit {
  parametersForm: FormGroup;
  pomodoros: number[] = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

  constructor(
    private authService: AuthService,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.parametersForm = this.fb.group({
      pomodoro: ['', [Validators.required]]
    })
  }

  onSubmit() {
    const user: User | null = this.authService.currentUser;
    if (user) {
      user.pomodoroDuration = this.parametersForm.get('pomodoro')?.value * 60;
      this.authService.updateUserState(user).subscribe();
    }
  }
}
