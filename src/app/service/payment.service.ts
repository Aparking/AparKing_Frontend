import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private backendUrl = 'http://localhost:3000'; // URL de tu API de Django

  constructor(private http: HttpClient) { }

  createCheckoutSession(planId: string) {
    return this.http.post<{ url: string }>(`${this.backendUrl}/payment/api/create-checkout-session/`, { planId });
  }
}