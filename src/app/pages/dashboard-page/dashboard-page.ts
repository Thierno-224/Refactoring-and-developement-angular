import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {DataService} from '../../services/data.service';
import {Stat} from "../../models/olympic-models";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.scss'],
})
export class DashboardPage implements OnInit {
  private dataService = inject(DataService);
  private destroyRef = inject(DestroyRef);

  public isEmpty = false;
  public isLoading = true;
  public totalCountries = 0;
  public totalJOs = 0;
  public error = '';
  public titlePage = 'Medals per Country';
  public countries: string[] = [];
  public medals: number[] = [];
  public stats: Stat[] = [];
  public countryIds: number[] = [];

  ngOnInit(): void {
    this.dataService.getOlympic()
      .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: (data) => {
        this.isLoading = false;

        if (data.length === 0) {
          this.isEmpty = true;
          return;
        }

        const sortedData = [...data].sort((a, b) => a.country.localeCompare(b.country));

        this.totalJOs = new Set(
          data.flatMap(country => country.participations.map(p => p.year))
        ).size;

        this.countries = sortedData.map(country => country.country);
        this.countryIds = sortedData.map(country => country.id);
        this.totalCountries = this.countries.length;

        this.medals = sortedData.map(country =>
          country.participations.reduce((total, p) => total + p.medalsCount, 0)
        );

        this.stats = [
          {label: 'Number of countries', value: this.totalCountries},
          {label: 'Number of JOs', value: this.totalJOs}
        ];
      },
      error: () => {
        this.error = "Une erreur s'est produite";
        this.isLoading = false;
      }
    });
  }
}
