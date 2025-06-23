import { Component } from '@angular/core';
import { SidenavService } from '../../../services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private sidenavService: SidenavService) {}

  onToggleMenu() {
    this.sidenavService.toggle();
    
  }
}
