import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isMenuOpen = false;
  constructor(public authService: AuthService) {}
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  getUserInitials(): string {
    if (!this.authService.userData || !this.authService.userData.displayName) {
      return '';
    }
    const nameParts = this.authService.userData.displayName.split(' ');
    if (nameParts.length < 2) {
      return '';
    }
    const initials = nameParts
      .slice(0, 2)
      .map((name) => name[0])
      .join('');
    return initials;
  }
}
