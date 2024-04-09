import { Injectable } from '@angular/core';
import { DataManagementService } from './data-management.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private dataManagementService: DataManagementService) { }

  async createCheckoutSession(planId: string): Promise<any> {
    try {
      return await this.dataManagementService.createCheckoutSession(planId);
    } catch (error) {

      throw error;
    }
  }
}
