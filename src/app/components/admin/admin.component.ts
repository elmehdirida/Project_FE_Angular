import {Component, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs";
import {LocalStorageService} from "../../services/Storage/local-storage.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
animations: [
  trigger('openClose', [
    state('open', style({
      width: '300px',
    })),
    state('closed', style({
      width: '0',
    })),
    transition('open <=> closed', [
      animate('0.5s')
    ]),
  ]),
]
})
export class AdminComponent {
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  isSmallScreen: boolean = false;
  isOpen = false;
  isLoginIn: any;
    constructor(private breakpointObserver: BreakpointObserver,
                public localStorageService: LocalStorageService
                ) {
      this.isLoginIn = this.localStorageService.isUserLoggedIn();
      if(!this.isLoginIn || this.localStorageService.getUserStorage().role !== 'admin'){
        window.location.href = '/home';
      }
      this.breakpointObserver.observe([
        Breakpoints.HandsetLandscape,
        Breakpoints.HandsetPortrait,
        ]).pipe(map((state) => state.matches)).subscribe((isSmall) => {
          this.isSmallScreen = isSmall;
          if (this.isSmallScreen) {
            this.sidenav?.close();
            }
            else {
                this.sidenav?.open();
                }
          }
      );
      }

  toggle() {
    this.isOpen = !this.isOpen;
    console.log('toggle function called, isOpen:', this.isOpen);

  }

  getCurrentRoute() {
      let path = window.location.pathname;
      path = path.split('/').pop() || '';
      return path;
  }
  logout() {

  }
}
