import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestService } from './services/rest.service';

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
   
    CommonModule,
    IonicModule.forRoot(), 
   
    AppRoutingModule, 
    ReactiveFormsModule,
   
    RouterModule,
    HttpClientModule,
  ],

  providers: [
    { 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy },
    HttpClient,
    RestService,
  ],

  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
