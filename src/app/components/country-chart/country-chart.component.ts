import {Component, input, InputSignal} from '@angular/core';
import Chart from "chart.js/auto";

@Component({
  selector: 'app-country-chart',
  standalone: true,
  imports: [],
  templateUrl: './country-chart.component.html',
  styleUrl: './country-chart.component.scss'
})
export class CountryChartComponent {
  public lineChart!: Chart<"line", number[], number>;
  years: InputSignal<number[]> = input.required<number[]>();
  medals: InputSignal<number[]> = input.required<number[]>();

  ngAfterViewInit() {
    this.buildChart();
  }

  buildChart() {
    const lineChart = new Chart("countryChart", {
      type: 'line',
      data: {
        labels: this.years(),
        datasets: [
          {
            label: "medals",
            data: this.medals(),
            backgroundColor: '#0b868f'
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
    this.lineChart = lineChart;
  }
}
