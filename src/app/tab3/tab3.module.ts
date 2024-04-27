import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab3Page } from './tab3.page';

import { parkingCesionComponent } from '../components/parkingCesion/parkingCesion.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { Tab3PageRoutingModule } from './tab3-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab3PageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [Tab3Page, ProfileComponent, parkingCesionComponent],
  exports: [ProfileComponent, parkingCesionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab3PageModule { }
