import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab2Page } from './tab2.page';

import { HttpClientModule } from '@angular/common/http';
import { GarageBookCreateComponent } from '../components/rental/garage-book-create/garage-book-create.component';
import { GarageBookListComponent } from '../components/rental/garage-book-list/garage-book-list.component';
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
    GarageBookCreateComponent,
    GarageBookListComponent,
  ],
  exports: [
    GarageListComponent,
    GarageCreateComponent,
    GarageDetailComponent,
    GarageBookCreateComponent,
    GarageBookListComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab2PageModule {}
