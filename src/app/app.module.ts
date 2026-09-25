import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryComponent } from "./pages/country/country.component";
import {StatCardComponent} from "./components/stat-card/stat-card.component";
import {MedalChartComponent} from "./components/medal-chart/medal-chart.component";
import {CountryChartComponent} from "./components/country-chart/country-chart.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, CountryComponent],
  imports: [BrowserModule, AppRoutingModule, StatCardComponent, MedalChartComponent, CountryChartComponent],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
