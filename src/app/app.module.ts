import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/user-management/register/register.component';
import { LoginModule } from './modules/login.module';
import {LogoutModule} from './modules/logout.module';
import { PricingPlanModule } from './modules/pricing-plan.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserListModule } from './components/user-list/user-list.module';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,ReactiveFormsModule,
     FormsModule,LoginModule,LogoutModule,HttpClientModule,UserListModule,PricingPlanModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
