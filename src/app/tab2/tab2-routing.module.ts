import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { GarageDetailComponent } from '../components/rental/garage-detail/garage-detail.component';

const routes: Routes = [
  {
    path: '', // aparKing/garages/''
    component: Tab2Page,
  },
  {
    path: ':id',
    component: GarageDetailComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab2PageRoutingModule {}
