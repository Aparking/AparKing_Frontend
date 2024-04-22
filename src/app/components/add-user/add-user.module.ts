import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddUserComponent } from './add-user.component';

@NgModule({
  declarations: [AddUserComponent],
  imports: [CommonModule, IonicModule,FormsModule],
  exports: [AddUserComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Agrega CUSTOM_ELEMENTS_SCHEMA aquí
})
export class AddUserModule { }
