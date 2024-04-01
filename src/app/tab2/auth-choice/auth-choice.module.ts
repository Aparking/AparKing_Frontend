import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthChoiceComponent } from './auth-choice.component';

@NgModule({
  declarations: [AuthChoiceComponent],
  imports: [CommonModule, IonicModule],
  exports: [AuthChoiceComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthChoiceModule { }
