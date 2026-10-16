import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataService} from '../../services/data.service';
import {Stat} from "../../models/olympic-models";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-country-detail-page',
  templateUrl: './country-detail-page.html',
  styleUrls: ['./country-detail-page.scss']
})
export class CountryDetailPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private dataService = inject(DataService);
  private destroyRef = inject(DestroyRef);

  public isEmpty = false;
  public isLoading = true;
  public error = '';

  public titlePage = '';
  public totalEntries = 0;
  public totalMedals = 0;
  public totalAthletes = 0;
  public years: number[] = [];
  public medals: number[] = [];
  public stats: Stat[] = [];

  ngOnInit(): void {
    const identifier = this.activatedRoute.snapshot.paramMap.get('identifier');

    if (!identifier) return;

    let country$;

    if (!isNaN(Number(identifier))) {
      country$ = this.dataService.getOlympicById(Number(identifier));
    } else {
      country$ = this.dataService.getOlympicByCountry(identifier);
    }

    country$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
      next: (selectedCountry) => {
        this.isLoading = false;

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
          {label: 'Number of entries', value: this.totalEntries},
          {label: 'Total Number of medals', value: this.totalMedals},
          {label: 'Total Number of athletes', value: this.totalAthletes}
        ];
      },
      error: () => {
        this.error = "Une erreur s'est produite";
        this.isLoading = false;
      }
    });
  }


}
