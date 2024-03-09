import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { CreateParkingModalComponent } from '../components/create-parking-modal/create-parking-modal.component';
import { MapComponent } from '../components/map/map.component';
import { DataManagementService } from '../service/data-management.service';
import { TabsPage } from './tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [TabsPage, MapComponent, CreateParkingModalComponent],
  exports: [MapComponent, CreateParkingModalComponent],
  providers: [DataManagementService],
})
export class TabsPageModule {}
