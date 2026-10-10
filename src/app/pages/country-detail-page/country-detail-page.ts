import {HttpErrorResponse} from '@angular/common/http';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {Stat} from "../../models/olympic-models";

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private dataService = inject(DataService);

  public isEmpty : boolean = false;
  public isLoading : boolean = true;
  public error = '';

  public titlePage: string = '';
  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public years!: number[];
  public medals!: number[];
  public stats: Stat[] = [];

  ngOnInit(): void {
    const countryName = this.activatedRoute.snapshot.paramMap.get('countryName');

    this.dataService.getOlympic().subscribe(
      (data) => {
        this.isLoading = false;

        if (data.length === 0) {
          this.isEmpty = true;
          return;
        }
        const selectedCountry = data.find(i => i.country === countryName);

        if (!selectedCountry) {
          void this.router.navigate(['/not-found']);
          return;
        }

        this.titlePage = selectedCountry.country;
        this.totalEntries = selectedCountry.participations.length;
        this.years = selectedCountry.participations.map(p => p.year);
        this.medals = selectedCountry.participations.map(p => p.medalsCount);
        this.totalMedals = this.medals.reduce((acc, medal) => acc + medal, 0);

        const athletes = selectedCountry.participations.map(p => p.athleteCount);
        this.totalAthletes = athletes.reduce((acc, athlete) => acc + athlete, 0);

        this.stats = [
          {label: 'Number of entries', value : this.totalEntries},
          {label: 'Total Number of medals', value: this.totalMedals},
          {label: 'Total Number of athletes', value: this.totalAthletes}
        ]

      },
      (error: HttpErrorResponse) => {
        this.error = "Une erreur s'est produite";
        this.isLoading = false;
      }
    );
  }
}
