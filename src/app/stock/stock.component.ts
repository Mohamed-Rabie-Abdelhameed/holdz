import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  symbol: string;
  stockData: any;
  stockLogo: string;
  change: number;

  constructor(
    private stockAPI: StockService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.symbol = params.get('symbol');
      this.loadStockData();
    });
  }

  loadStockData() {
    this.stockAPI.getStockData(this.symbol).then((data) => {
      this.stockData = data;
      this.change = parseFloat(this.stockData.change);
      console.log(this.stockData);
    });
    this.stockAPI.getStockLogo(this.symbol).then((data) => {
      this.stockLogo = data;
    });
  }

  formatPrice(price: string) {
    const floatPrice = parseFloat(price);
    const formattedNumber = floatPrice.toLocaleString('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return formattedNumber;
  }

  toggleFavorite() {
    if (this.authService.getUserFavorites().includes(this.symbol)) {
      this.authService.removeUserFavorite(this.symbol);
    } else {
      this.authService.addUserFavorite(this.symbol);
    }
  }

  showLogin() {
    this.router.navigate(['sign-in']);
  }
}
