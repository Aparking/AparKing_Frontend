import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WsAstractService } from './ws-astract.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends WsAstractService{

  serverUrl = 'http://127.0.0.1:8000/';
  apiPath = '';
  path = this.serverUrl + this.apiPath;


  async registerUser(data: any): Promise<any> {
    return this.makePostRequest(`${this.path}/register/`, data);
  }
}
