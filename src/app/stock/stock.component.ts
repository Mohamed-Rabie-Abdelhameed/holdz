import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {

  symbol: string;
  stockData: any;
  stockLogo: string;

  constructor(private stockAPI: StockService, private router: Router) {}

  ngOnInit(): void {
    this.symbol = this.router.url.split('/')[2];
    this.stockAPI.getStockData(this.symbol).then((data) => {
      this.stockData = data;
      console.log(this.stockData);
    });
    this.stockAPI.getStockLogo(this.symbol).then((data) => {
      this.stockLogo = data;
      console.log(this.stockLogo);
    });
  }
}
