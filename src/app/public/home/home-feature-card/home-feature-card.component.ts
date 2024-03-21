import { Component, Input } from '@angular/core';

@Component({
  selector: 'al-home-feature-card',
  templateUrl: './home-feature-card.component.html',
  styles: [
  ]
})
export class HomeFeatureCardComponent {
  @Input() title: string = '';
  @Input() icon: string = '';
  @Input() description: string = '';

}
