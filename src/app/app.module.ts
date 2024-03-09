import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserListModule } from './components/user-list/user-list.module';
import { RegisterComponent } from './usuarios/register/register.component';
import { LoginModule } from './usuarios/login/login.module';
import {LogoutModule} from './usuarios/logout/logout.module';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,ReactiveFormsModule,
     FormsModule,LoginModule,LogoutModule,HttpClientModule,UserListModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
