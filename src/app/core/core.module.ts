import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';
import { HttpClientModule } from '@angular/common/http';

import { PublicModule } from '../public/public.module';
import { ProtectedModule } from '../protected/protected.module';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ToastrComponent } from './components/toastr/toastr.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoaderComponent,
    ToastrComponent,
  ],
  imports: [
    SharedModule,
    PublicModule,
    ProtectedModule,
    AlertModule.forRoot(),
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoaderComponent,
    ToastrComponent,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded !');
    }
  }
}
