import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestService } from 'src/app/service/rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService extends RestService {
  serverUrlPayment = environment.restUrl;
  apiPathPayment = '';
  pathPayment = this.serverUrl + this.apiPath;

  constructor(http: HttpClient) {
    super(http);
  }

  async createCheckoutSession(planId: string): Promise<any> {
    try {
      // Usamos toPromise para convertir el Observable a una Promise.
      return await this.makePostRequest(`${this.pathPayment}/payment/api/create-checkout-session/`, { planId });

    } catch (error) {
      // Manejar el error como prefieras, aquí solo lo re-emitimos.
      throw error;
    }
  }
}
