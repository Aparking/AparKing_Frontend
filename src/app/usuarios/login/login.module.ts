import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, IonicModule,FormsModule],
  exports: [LoginComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginModule { }
