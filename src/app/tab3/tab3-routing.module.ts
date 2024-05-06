import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule { }
