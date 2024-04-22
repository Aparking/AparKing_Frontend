import { Injectable } from '@angular/core';
import { DataManagementService } from './data-management.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private dataManagementService: DataManagementService) { }

  serverUrl = window.location.href;
  apiPath = '';
  path = this.serverUrl + this.apiPath;

  async createCheckoutSession(planId: string, url: string): Promise<any> {
    try {
      return await this.dataManagementService.createCheckoutSession(planId, this.path);
    } catch (error) {

      throw error;
    }
  }
}
