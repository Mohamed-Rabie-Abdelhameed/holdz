import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css'],
})
export class FavoritesComponent {
  constructor(public authService: AuthService, private renderer: Renderer2) {}

  @ViewChild('searchInput') searchInput: ElementRef;

  removeFavorite(favorite: string) {
    this.authService.removeUserFavorite(favorite);
  }

  openSearchModal() {
    document.getElementById('searchModal').classList.remove('hidden');
    document.getElementById('searchModal').classList.add('block');
    // focus on search input
    this.renderer.selectRootElement(this.searchInput.nativeElement).focus();
  }

  closeSearchModal() {
    document.getElementById('searchModal').classList.remove('block');
    document.getElementById('searchModal').classList.add('hidden');
  }

  // close modal when pressing escape key
  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    this.closeSearchModal();
  }

  // close modal when clicking outside of it
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (event.target.classList.contains('modal')) {
      this.closeSearchModal();
    }
  }
}
