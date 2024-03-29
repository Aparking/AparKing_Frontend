import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Tab3Page } from './tab3.page';

import { Tab3PageRoutingModule } from './tab3-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, Tab3PageRoutingModule],
  declarations: [Tab3Page],
})
export class Tab3PageModule {}
