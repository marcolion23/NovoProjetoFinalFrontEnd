import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from '../../../services/sidenav.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  private toggleSubscription!: Subscription;

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.toggleSubscription = this.sidenavService.toggle$.subscribe(() => {
      this.sidenav.toggle();
    });
  }

  ngOnDestroy(): void {
    this.toggleSubscription.unsubscribe();
  }
}
