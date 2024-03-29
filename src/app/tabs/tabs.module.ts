import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';
import { TabsPageRoutingModule } from './tabs-routing.module';

import { RouterModule } from '@angular/router';
import { GarageDetailComponent } from '../components/rental/garage-detail/garage-detail.component';
import { GarageListComponent } from '../components/rental/garage-list/garage-list.component';
import { MyGaragesComponent } from '../components/rental/my-garages/my-garages.component';
import { RestService } from '../service/rest.service';
import { TabsPage } from './tabs.page';

import { CreateParkingModalComponent } from '../components/create-parking-modal/create-parking-modal.component';
import { MapComponent } from '../components/map/map.component';
import { GarageCreateComponent } from '../components/rental/garage-create/garage-create.component';
import { DataManagementService } from '../service/data-management.service';
import { WebsocketService } from '../service/websocket.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  declarations: [
    TabsPage,
    MapComponent,
    CreateParkingModalComponent,
    GarageListComponent,
    GarageDetailComponent,
    MyGaragesComponent,
    GarageCreateComponent,
  ],
  exports: [
    MapComponent,
    CreateParkingModalComponent,
    GarageListComponent,
    GarageDetailComponent,
    MyGaragesComponent,
    GarageCreateComponent,
  ],
  providers: [RestService, DataManagementService, WebsocketService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabsPageModule {}
