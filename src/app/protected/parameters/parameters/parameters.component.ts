import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'ntc-parameters',
  templateUrl: './parameters.component.html',
  styles: []
})
export class ParametersComponent implements OnInit {

  parametersForm: FormGroup;
  pomodoros: number[] = [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    ) { }

  ngOnInit() {
    this.parametersForm = this.fb.group({
      pomodoros: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const user: User = this.authService.currentUser;
    user.pomodoroDuration = this.parametersForm.get('pomodoros').value * 60;
    this.authService.updateUserState(user).subscribe();
  }

}
