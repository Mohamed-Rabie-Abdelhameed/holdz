import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isMenuOpen = false;
  constructor(
    public authService: AuthService,
    private stockAPI: StockService
  ) {}
  searchQuery: string = '';
  searchResults: any[] = [];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  searchStocks() {
    if (this.searchQuery.length >= 3) {
      this.stockAPI.getStockSearchResults(this.searchQuery).then((data) => {
        this.searchResults = data.data;
        console.log(this.searchResults);
      });
    } else {
      this.searchResults = [];
    }
  }
}
