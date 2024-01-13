import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor() {}

  apiKey = environment.twelveData.apiKey;

  getStockData(stockSymbol: string) {
    return fetch(
      `https://api.twelvedata.com/quote?symbol=${stockSymbol}&apikey=${this.apiKey}`
    ).then((response) => response.json());
  }

  getStockChartData(stockSymbol: string) {
    // return fetch(
    //   'sfsdfs'
    // ).then((response) => response.json());
    return fetch(
      `https://api.twelvedata.com/time_series?symbol=${stockSymbol}&interval=15min&apikey=${this.apiKey}`
    ).then((response) => response.json());
  }

  getStockSearchResults(searchQuery: string) {
    return fetch(
      `https://api.twelvedata.com/symbol_search?symbol=${searchQuery}&apikey=${this.apiKey}`
    ).then((response) => response.json());
  }

  getStockLogo(stockSymbol: string) {
    return fetch(
      `https://api.twelvedata.com/logo?symbol=${stockSymbol}&apikey=${this.apiKey}`
    ).then((response) => response.json().then((data) => data.url));
  }
}
