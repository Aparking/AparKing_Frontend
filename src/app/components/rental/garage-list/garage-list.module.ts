import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GarageListComponent } from './garage-list.component';
import { RouterModule } from '@angular/router'; 
import { IonicModule } from '@ionic/angular'; 


@NgModule({
  declarations: [
    GarageListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule
  ]
})
export class GarageModule { }
