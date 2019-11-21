import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private isSideNavCollapsed: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public readonly isSideNavCollapsed$: Observable<boolean> = this.isSideNavCollapsed.asObservable();

  constructor() { }

  public toggleSideNav() {
    this.isSideNavCollapsed.next(!this.isSideNavCollapsed.value);
  }

}
