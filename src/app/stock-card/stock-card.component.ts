import { Component, Input, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css'],
})
export class StockCardComponent implements OnInit {
  @Input() symbol: string;
  stockData: any = {
    symbol: 'AAPL',
    name: 'Apple Inc',
    exchange: 'NASDAQ',
    mic_code: 'XNGS',
    currency: 'USD',
    datetime: '2024-01-12',
    timestamp: 1705093140,
    open: '186.06000',
    high: '186.74001',
    low: '185.19000',
    close: '185.92000',
    volume: '40444700',
    previous_close: '185.59000',
    change: '0.33000',
    percent_change: '0.17781',
    average_volume: '55617120',
    is_market_open: false,
    fifty_two_week: {
      low: '131.44000',
      high: '199.62000',
      low_change: '54.48000',
      high_change: '-13.70000',
      low_change_percent: '41.44857',
      high_change_percent: '-6.86304',
      range: '131.440002 - 199.619995',
    },
  };
  stockLogo: string = 'https://api.twelvedata.com/logo/apple.com';
  isLoading = false;
  constructor(private stockService: StockService) {}
  ngOnInit(): void {
    // if (this.symbol) {
    //   this.isLoading = true;
    //   this.stockService.getStockData(this.symbol).then((data) => {
    //     this.stockData = data;
    //     console.log(this.stockData);
    //   });
    //   this.stockService.getStockLogo(this.symbol).then((data) => {
    //     this.stockLogo = data;
    //     console.log(this.stockLogo);
    //     this.isLoading = false;
    //   });
    // }
  }
  formatNumber(number) {
    const floatNumber = parseFloat(number);
    return floatNumber.toFixed(2);
  }
}
