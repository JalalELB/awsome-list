import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ntc-home-features-card',
  templateUrl: './home-features-card.component.html',
  styles: []
})
export class HomeFeaturesCardComponent implements OnInit {

  @Input() description: string;
  @Input() icon: string;
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
