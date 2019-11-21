import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { LoginRouterModule } from './login-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';

@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [
    SharedModule,
    LoginRouterModule
  ]
})
export class LoginModule { }
