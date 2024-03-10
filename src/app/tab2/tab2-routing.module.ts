import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GarageDetailComponent } from '../components/rental/garage-detail/garage-detail.component';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
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
