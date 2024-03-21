import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfilComponent } from './profil/profil.component';
import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilFormComponent } from './profil-form/profil-form.component';



@NgModule({
  declarations: [
    ProfilComponent,
    ProfilFormComponent
  ],
  imports: [
    SharedModule,
    ProfilRoutingModule
  ]
})
export class ProfilModule { }
