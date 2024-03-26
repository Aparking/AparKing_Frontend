import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from '../components/user-management/logout/logout.component';
import { Logout } from '../service/logout.service';

@NgModule({
  declarations: [LogoutComponent],
  imports: [CommonModule, IonicModule,FormsModule],
  exports: [LogoutComponent],
  providers: [
    Logout
],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LogoutModule { }
