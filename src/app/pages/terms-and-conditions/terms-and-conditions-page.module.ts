import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsAndConditionsPage } from './terms-and-conditions-page.page';

import { TermsAndConditionsPageRoutingModule } from './terms-and-conditions-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsAndConditionsPageRoutingModule
  ],
  declarations: [TermsAndConditionsPage]
})
export class TermsAndConditionsPageModule { }
