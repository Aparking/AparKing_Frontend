import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { registerVehiclePage } from './registerVehicle.page';

const routes: Routes = [
  {
    path: '',
    component: registerVehiclePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule { }
