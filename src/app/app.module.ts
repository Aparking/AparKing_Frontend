import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserModule } from './components/add-user/add-user.module';
import { UserDetailsModule } from './components/user-details/user-details.module';
import { UserListModule } from './components/user-list/user-list.module';
import { RegisterComponent } from './usuarios/register/register.component';
import { LoginModule } from './usuarios/login/login.module';
import {LogoutModule} from './usuarios/logout/logout.module';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,FormsModule,ReactiveFormsModule,
     FormsModule,LoginModule,LogoutModule,HttpClientModule,UserListModule,AddUserModule,UserDetailsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
