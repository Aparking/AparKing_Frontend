import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GarageCreateComponent } from './components/rental/garage-create/garage-create.component';
import { GarageCreateImageComponent } from './components/rental/garage-create-image/garage-create-image.component';


@NgModule({
  declarations: [
    AppComponent,
    GarageCreateComponent,
    GarageCreateImageComponent
  ],

  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule],

  providers: [{ 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy }],

  bootstrap: [AppComponent],
})
export class AppModule {}
