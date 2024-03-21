import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'al-page-not-found',
  templateUrl: './page-not-found.component.html',
  styles: [
  ]
})
export class PageNotFoundComponent {

  constructor(private location: Location) {}

  back() {
    this.location.back();
  }

}
