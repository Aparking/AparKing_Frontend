import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { listVehicleComponent } from '../components/listVehicle/listVehicle.component';
import { registerVehicleComponent } from '../components/registerVehicle/registerVehicle.component';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
  }, {
    path: 'registerVehicle',
    component: registerVehicleComponent,
  },
  {
    path: 'listVehicle',
    component: listVehicleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule { }
