import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxBootstrapModule } from './modules/ngx-bootstrap.module';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxBootstrapModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    NgxBootstrapModule,
    SidenavComponent,
  ]
})
export class SharedModule { }
