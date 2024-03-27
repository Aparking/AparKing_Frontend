import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyUserPageRoutingModule } from './verify-user-routing.module';

import { SharedModule } from 'src/app/components/shared/shared.module';
import { VerifyUserPage } from './verify-user.page';

@NgModule({
  imports: [
    IonicModule.forRoot(),
    CommonModule,
    FormsModule,
    IonicModule,
    VerifyUserPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [VerifyUserPage],
})
export class VerifyUserPageModule {}
