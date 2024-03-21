import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'al-login-form',
  templateUrl: './login-form.component.html',
  styles: [
  ]
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {}


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]],
    });
  }


  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }


  submit(): void {
    this.authService.login(this.email?.value, this.password?.value)
    .subscribe({
      complete: () => this.router.navigate(['/app/dashboard']),
      error: () => this.loginForm.reset(),
    }
    )
  }

}
