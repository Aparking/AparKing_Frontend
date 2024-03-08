import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { GarageListComponent } from '../components/rental/garage-list/garage-list.component';
import { RestService } from '../services/rest.service';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    HttpClientModule,
    RouterModule,
  ],
  declarations: [TabsPage, GarageListComponent],
  exports: [GarageListComponent],
  providers: [RestService],
})
export class TabsPageModule {}
