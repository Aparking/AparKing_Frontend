import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { parkingCesionComponent } from '../components/parkingCesion/parkingCesion.component';
import { Tab4PageRoutingModule } from './tab4-routing.module';
import { Tab4Page } from './tab4.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab4PageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [Tab4Page, parkingCesionComponent],
  exports: [parkingCesionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab4PageModule { }
