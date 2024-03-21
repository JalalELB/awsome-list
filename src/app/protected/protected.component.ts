import { Component, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from '../core/services/layout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'al-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit, OnDestroy {

  isSideNavCollapsed: boolean;
  private subscription: Subscription;


  constructor(private layoutService: LayoutService) {}


  ngOnInit(): void {
    this.subscription = this.layoutService.isSideNavCollapsed$.subscribe(is => this.isSideNavCollapsed = is);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
