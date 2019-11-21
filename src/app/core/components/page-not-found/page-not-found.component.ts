import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'ntc-page-not-found',
  templateUrl: './page-not-found.component.html',
  styles: []
})
export class PageNotFoundComponent {

  constructor(private location: Location) { }

  back() {
    this.location.back();
  }
}
