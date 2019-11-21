import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomeFeaturesCardComponent } from './home-features-card/home-features-card.component';
import { HomeFeaturesComponent } from './home-features/home-features.component';

@NgModule({
  declarations: [HomeComponent, HomeBannerComponent, HomeFeaturesCardComponent, HomeFeaturesComponent],
  imports: [
    SharedModule
  ]
})
export class HomeModule { }
