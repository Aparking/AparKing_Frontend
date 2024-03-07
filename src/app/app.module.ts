import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { GarageListComponent } from './components/rental/garage-list/garage-list.component';

@NgModule({
  declarations: [AppComponent, GarageListComponent],
  imports: [BrowserModule, CommonModule, IonicModule.forRoot(), AppRoutingModule, RouterModule, HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
