import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab2Page } from './tab2.page';

import { HttpClientModule } from '@angular/common/http';
import { GarageCreateComponent } from '../components/rental/garage-create/garage-create.component';
import { GarageDetailComponent } from '../components/rental/garage-detail/garage-detail.component';
import { GarageListComponent } from '../components/rental/garage-list/garage-list.component';
import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab2PageRoutingModule,
    HttpClientModule,
  ],
  declarations: [
    Tab2Page,
    GarageListComponent,
    GarageCreateComponent,
    GarageDetailComponent,
  ],
  exports: [GarageListComponent, GarageCreateComponent, GarageDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab2PageModule {}
