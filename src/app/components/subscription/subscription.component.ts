import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/payments';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  ngOnInit() {
    console.log('login');
  }
  plans: Plan[] = [
    { id: 'FREE', name: 'FREE', price: '0€/month' },
    { id: 'NOBLE', name: 'NOBLE', price: '3.99€/month' },
    { id: 'KING', name: 'KING', price: '4.99€/month' }
  ];

  constructor(private paymentService: PaymentService) { }

  async selectPlan(planId: string) {
    try {
      const session = await this.paymentService.createCheckoutSession(planId);
      window.location.href = session.url; // O lo que sea que necesites hacer con session
    } catch (error) {
      console.error(error);
    }
  }
}