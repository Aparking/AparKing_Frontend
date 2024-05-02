import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';
import { SubscriptionComponent } from '../components/subscription/subscription.component';
import { Tab5PageRoutingModule } from './tab5-routing.module';
import { Tab5Page } from './tab5.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab5PageRoutingModule,
    HttpClientModule,
  ],
  declarations: [Tab5Page, SubscriptionComponent],
  exports: [SubscriptionComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab5PageModule { }
