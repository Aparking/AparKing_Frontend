import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WsAstractService } from './ws-astract.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends WsAstractService{

  serverUrl = 'http://127.0.0.1:8000/';
  apiPath = '';
  path = this.serverUrl + this.apiPath;

  private currentUser: any;


  async loginUser(data: any): Promise<any> {
    return await this.makePostRequest(`${this.path}/login/`, data);
  }

  setCurrentUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
}