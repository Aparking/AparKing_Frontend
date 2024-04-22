import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPageRoutingModule } from './registerVehicle-routing.module';

import { SharedModule } from 'src/app/components/shared/shared.module';
import { registerVehiclePage } from 'src/app/pages/registerVehicle/registerVehicle.page';


@NgModule({
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [registerVehiclePage],
})
export class RegisterPageModule { }
