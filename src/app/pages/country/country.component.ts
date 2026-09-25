import {HttpErrorResponse} from '@angular/common/http';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);

  public titlePage: string = '';
  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public error!: string;
  public years!: number[];
  public medals!: number[];

  ngOnInit(): void {
    const countryName = this.route.snapshot.paramMap.get('countryName');

    this.dataService.getOlympic().subscribe(
      (data) => {
        const selectedCountry = data.find(i => i.country === countryName);

        if (selectedCountry) {
          this.titlePage = selectedCountry.country;
          this.totalEntries = selectedCountry.participations.length;
          this.years = selectedCountry.participations.map(p => p.year);
          this.medals = selectedCountry.participations.map(p => p.medalsCount);
          this.totalMedals = this.medals.reduce((acc, medal) => acc + medal, 0);

          const athletes = selectedCountry.participations.map(p => p.athleteCount);
          this.totalAthletes = athletes.reduce((acc, athlete) => acc + athlete, 0);
        }
      },
      (error: HttpErrorResponse) => {
        this.error = error.message;
      }
    );
  }
}
