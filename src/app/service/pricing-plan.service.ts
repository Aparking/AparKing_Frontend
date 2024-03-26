import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WsAstractService } from './ws-astract.service';

@Injectable({
  providedIn: 'root'
})


export class PricingPlanService extends WsAstractService{

  serverUrl = 'http://127.0.0.1:8000/';
  apiPath = '';
  path = this.serverUrl + this.apiPath;

  async pricingUser(data: any): Promise<any> {
    return await this.makePostRequest(`${this.path}/pricing-plan/`, data);
  }
}
