import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PricingPlanComponent } from '../components/pricing-plan/pricing-plan.component';
import { MemberType } from '../models/pricing.models';

@NgModule({
  declarations: [PricingPlanComponent],
  imports: [CommonModule, IonicModule,FormsModule],
  exports: [PricingPlanComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PricingPlanModule { }
