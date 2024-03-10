import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';
import { TabsPageRoutingModule } from './tabs-routing.module';

import { RouterModule } from '@angular/router';
import { GarageDetailComponent } from '../components/rental/garage-detail/garage-detail.component';
import { GarageListComponent } from '../components/rental/garage-list/garage-list.component';
import { MyGaragesComponent } from '../components/rental/my-garages/my-garages.component';
import { RestService } from '../services/rest.service';
import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [
    TabsPage,
    GarageListComponent,
    GarageDetailComponent,
    MyGaragesComponent,
  ],
  exports: [GarageListComponent, GarageDetailComponent, MyGaragesComponent],
  providers: [RestService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabsPageModule {}
