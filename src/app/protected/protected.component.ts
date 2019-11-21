import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from '../core/services/layout.service';

@Component({
  selector: 'ntc-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit, OnDestroy {

  public isSideNavCollapsed: boolean;
  private subscription: Subscription;

  constructor(private layoutService: LayoutService,) { }

  ngOnInit() {
    this.subscription = this.layoutService.isSideNavCollapsed$.subscribe(
      isSideNavCollapsed => this.isSideNavCollapsed = isSideNavCollapsed
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
