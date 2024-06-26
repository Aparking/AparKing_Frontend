import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GarageCreateComponent } from '../components/rental/garage-create/garage-create.component';
import { GarageDetailComponent } from '../components/rental/garage-detail/garage-detail.component';
import { Tab2Page } from './tab2.page';
import { MyGaragesComponent } from '../components/rental/my-garages/my-garages.component';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'create',
    component: GarageCreateComponent,
  },
  {
    path: 'garages/:id',
    component: MyGaragesComponent,
  },

  {
    path: ':id',
    component: GarageDetailComponent,
  },
  {
    path: ':id/edit',
    component: GarageCreateComponent,
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
