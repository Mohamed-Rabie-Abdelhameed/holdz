import { Component, Input, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css'],
})
export class StockCardComponent implements OnInit {
  @Input() symbol: string;
  stockData: any ;
  stockLogo: string;
  isLoading = false;
  constructor(private stockService: StockService) {}
  ngOnInit(): void {
    if (this.symbol) {
      setTimeout(() => {
      this.isLoading = true;
      this.stockService.getStockData(this.symbol).then((data) => {
        this.stockData = data;
        console.log(this.stockData);
      });
      this.stockService.getStockLogo(this.symbol).then((data) => {
        this.stockLogo = data;
        console.log(this.stockLogo);
        this.isLoading = false;
      });
    },10000);
  }
  }
  formatNumber(number) {
    const floatNumber = parseFloat(number);
    return floatNumber.toFixed(2);
  }
}
