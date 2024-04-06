import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WsAbstractService } from 'src/app/service/ws-astract.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends WsAbstractService {
  private backendUrl = 'http://localhost:3000'; // URL de tu API de Django

  constructor(http: HttpClient) {
    super(http);
  }

  async createCheckoutSession(planId: string): Promise<any> {
    try {
      // Usamos toPromise para convertir el Observable a una Promise.
      return await this.makePostRequest(`${this.backendUrl}/payment/api/create-checkout-session/`, { planId });

    } catch (error) {
      // Manejar el error como prefieras, aquí solo lo re-emitimos.
      throw error;
    }
  }
}
