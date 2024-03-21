import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'al-home-features',
  templateUrl: './home-features.component.html',
  styles: [
  ]
})
export class HomeFeaturesComponent implements OnInit {

  features: { title: string, description: string, icon: string }[];

  constructor() { }

  ngOnInit(): void {
    this.features = [
      {
        title: 'Planifier sa semaine',
        description: 'Visibilité sur les 7 prochains jours',
        icon: 'assets/img/calendar.svg'
      },
      {
        title: 'Atteindre ses objectifs',
        description: 'Priorisation des tâches',
        icon: 'assets/img/award.svg'
      },
      {
        title: 'Analyser sa productivité',
        description: 'Visualiser le travail accompli',
        icon: 'assets/img/diagram.svg'
      }
    ];
  }



}
