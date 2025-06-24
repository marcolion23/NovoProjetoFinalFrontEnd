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

  onToggleMenu() {
    this.menuOpen = !this.menuOpen;
    this.sidenavService.toggle(); // <-- aciona a abertura/fechamento do menu
  }
  
  }

