import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WsAstractService } from './ws-astract.service';

@Injectable({
  providedIn: 'root'
})
export class Logout extends WsAstractService{

  serverUrl = 'http://127.0.0.1:8000/';
  apiPath = '';
  path = this.serverUrl + this.apiPath;

  async logout(): Promise<any> {
    return await this.makeGetRequest(`${this.path}/logout/`);
  }
}
