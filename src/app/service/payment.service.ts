import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private backendUrl = 'http://localhost:3000'; // Asegúrate de usar la URL correcta de tu backend

  constructor(private http: HttpClient) {}

  createCheckoutSession() {
    // Asume que tienes un endpoint `/api/create-checkout-session` en tu backend
    return this.http.post(`${this.backendUrl}/payment/api/subscription/`, {});
  }
}
