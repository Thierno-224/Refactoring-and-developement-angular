import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard-page/dashboard-page';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CountryDetailPage } from "./pages/country-detail-page/country-detail-page";

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  },
  {
    path : 'country/:identifier',
    component : CountryDetailPage
  },

  {
    path : 'not-found',
    component : NotFoundComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
