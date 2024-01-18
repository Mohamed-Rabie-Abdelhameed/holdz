import { Component, Input, OnInit } from '@angular/core';
import { StockService } from '../services/stock.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  @Input() change: number;
  symbol: string;
  chartData = [];
  chartLabels = [];
  data: any;
  options: any;

  constructor(private stockAPI: StockService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.symbol = params.get('symbol');
      if (this.symbol) {
        this.stockAPI.getStockChartData(this.symbol).then((data) => {
          this.chartData = this.extractValues(data.values);
          this.chartLabels = this.extractLabels(data.values);
          this.updateChart();
        });
      }
    });
  }

  updateChart() {
    this.data = {
      labels: this.chartLabels,
      datasets: [
        {
          data: this.chartData,
          fill: false,
          borderColor:
            this.change == 0
              ? '#020202'
              : this.change > 0
              ? '#98FB98'
              : '#f6685d',
          tension: 0.4,
        },
      ],
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          display: false,
          labels: {
            color: '#616161',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#616161',
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            color: '#616161',
          },
        },
      },
    };
  }

  extractLabels(data: any[]): string[] {
    const labels = data.map((item) => this.extractTime(item.datetime));
    console.log(labels);
    labels.reverse();
    return labels.slice(4);
  }

  extractValues(data: any[]): number[] {
    const values = data.map((item) => parseFloat(item.close));
    console.log(values);
    values.reverse();
    return values.slice(4);
  }

  extractTime(dateTime: string): string {
    const dateTimeParts = dateTime.split(' ');
    const timeParts = dateTimeParts[1].split(':');
    const time = `${timeParts[0]}:${timeParts[1]}`;
    return time;
  }
}
