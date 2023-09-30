import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  partners = [
    {
      name: 'Citi Bank',
      image: 'assets/images/partner1.svg'
    },
    {
      name: 'Visa',
      image: 'assets/images/partner2.svg'
    },
    {
      name: 'Master Card',
      image: 'assets/images/partner3.svg'
    },
    {
      name: 'TradingView',
      image: 'assets/images/partner4.svg'
    },
    {
      name: 'HSBC Bank',
      image: 'assets/images/partner5.svg'
    },
    {
      name: 'NYSE',
      image: 'assets/images/partner6.svg'
    }
  ]
}
