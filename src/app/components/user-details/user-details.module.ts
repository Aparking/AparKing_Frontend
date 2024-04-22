import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UserDetailsComponent } from './user-details.component';

@NgModule({
  declarations: [UserDetailsComponent],
  imports: [CommonModule, IonicModule,FormsModule,RouterModule],
  exports: [UserDetailsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Agrega CUSTOM_ELEMENTS_SCHEMA aquí
})
export class UserDetailsModule { }
