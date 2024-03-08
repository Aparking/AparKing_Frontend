import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PricingPlanComponent } from './pricing-plan.component';

@NgModule({
  declarations: [PricingPlanComponent],
  imports: [CommonModule, IonicModule,FormsModule],
  exports: [PricingPlanComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PricingPlanModule { }