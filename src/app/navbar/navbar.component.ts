import { Component } from '@angular/core';
import { ModeService } from '../services/mode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private modeService: ModeService) {}
  isMenuOpen = false;
  isSearchOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  toggleSearch() {
    this.isSearchOpen = !this.isSearchOpen;
  }
}
