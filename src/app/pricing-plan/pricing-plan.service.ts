import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const  pricingUrl:string = 'http://localhost:8000/pricing-plan/';
@Injectable({
  providedIn: 'root'
})
export class PricingPlanService {
  constructor(private http: HttpClient) { }


  pricingUser(data: any): Observable<any> {
    return this.http.post(pricingUrl, data);
  }
}
