import {HttpErrorResponse} from '@angular/common/http';
import {Component, inject, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private dataService = inject(DataService);

  public totalCountries: number = 0;
  public totalJOs: number = 0;
  public error!: string;
  public titlePage: string = 'Medals per Country';
  public countries!: string[];
  public medals!: number[];

  ngOnInit(): void {
    this.dataService.getOlympic().subscribe(
      (data) => {
        if (data.length > 0) {
          this.totalJOs = Array.from(new Set(data.map(i => i.participations.map(p => p.year)).flat())).length;
          this.countries = data.map(i => i.country);
          this.totalCountries = this.countries.length;

          const medals = data.map(i => i.participations.map(p => p.medalsCount));
          this.medals = medals.map(countryMedals => countryMedals.reduce((acc, medal) => acc + medal, 0));
        }
      },
      (error: HttpErrorResponse) => {
        this.error = error.message;
      }
    );
  }
}
