import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryDetailPage } from "./pages/country-detail-page/country-detail-page";
import {HeaderComponent} from "./components/header-component/header-component";
import {MedalChartComponent} from "./components/medal-chart/medal-chart.component";
import {CountryChartComponent} from "./components/country-chart/country-chart.component";

@NgModule({
  declarations: [AppComponent, DashboardPage, NotFoundComponent, CountryDetailPage],
  imports: [BrowserModule, AppRoutingModule, HeaderComponent, MedalChartComponent, CountryChartComponent],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
