import {Component, inject, input, InputSignal} from '@angular/core';
import Chart from "chart.js/auto";
import {Router} from "@angular/router";

@Component({
  selector: 'app-medal-chart',
  standalone: true,
  imports: [],
  templateUrl: './medal-chart.component.html',
  styleUrl: './medal-chart.component.scss'
})
export class MedalChartComponent {

  private router = inject(Router);
  countryIds: InputSignal<number[]> = input.required<number[]>();
  countries: InputSignal<string[]> = input.required<string[]>();
  sumOfAllMedalsYears: InputSignal<number[]> = input.required<number[]>();
  public pieChart!: Chart<"pie", number[], string>;

  ngAfterViewInit(): void {
    this.buildPieChart();
  }

  buildPieChart() {
    const pieChart = new Chart("DashboardPieChart", {
      type: 'pie',
      data: {
        labels: this.countries(),
        datasets: [{
          label: 'Medals',
          data: this.sumOfAllMedalsYears(),
          backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
          hoverOffset: 4
        }],
      },
      options: {
        maintainAspectRatio: false,
        onClick: (e) => {
          if (e.native) {
            const points = pieChart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true)
            if (points.length) {
              const firstPoint = points[0];
              const countryId = this.countryIds()[firstPoint.index];
              void this.router.navigate(['country', countryId]);
            }
          }
        }
      }
    });
    this.pieChart = pieChart;
  }
}
