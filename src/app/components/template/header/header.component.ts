import { Component } from '@angular/core';
import { SidenavService } from '../../../services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private sidenavService: SidenavService) {}

  menuOpen = true;
quickAccessOpen = false;
autoCloseTimeout: any;

  // ✅ NOVO: painel de acesso rápido

  onToggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.sidenavService.toggle(); // <-- aciona a abertura/fechamento do menu esquerdo
  }

toggleQuickAccess() {
  this.quickAccessOpen = !this.quickAccessOpen;

  if (this.quickAccessOpen) {
    // inicia temporizador para fechar automaticamente
    clearTimeout(this.autoCloseTimeout);
    this.autoCloseTimeout = setTimeout(() => {
      this.quickAccessOpen = false;
    }, 5000); // fecha após 5s
  } else {
    clearTimeout(this.autoCloseTimeout);
  }
}

closeQuickAccess() {
  this.quickAccessOpen = false;
  clearTimeout(this.autoCloseTimeout);
}
}
