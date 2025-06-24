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

  menuOpen = true; // ✅ Novo: controla se o menu está aberto ou fechado

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.toggleSubscription = this.sidenavService.toggle$.subscribe(() => {
      this.toggleMenu();
    });
  }

  ngOnDestroy(): void {
    this.toggleSubscription.unsubscribe();
  }

  // ✅ Novo método: Faz o toggle e atualiza o estado do menu
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;

  }
}
