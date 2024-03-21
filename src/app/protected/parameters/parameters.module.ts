import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ParametersComponent } from './parameters/parameters.component';
import { ParametersRoutingModule } from './parameters-routing.module';
import { ParametersFormComponent } from './parameters-form/parameters-form.component';



@NgModule({
  declarations: [
    ParametersComponent,
    ParametersFormComponent
  ],
  imports: [
    SharedModule,
    ParametersRoutingModule
  ]
})
export class ParametersModule { }
