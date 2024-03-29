import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab2Page } from './tab2.page';

import { HttpClientModule } from '@angular/common/http';
import { TabsPageModule } from '../tabs/tabs.module';
import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    TabsPageModule,
    HttpClientModule,
  ],
  declarations: [Tab2Page],
})
export class Tab2PageModule {}
