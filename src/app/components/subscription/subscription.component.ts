import { Component } from '@angular/core';
import { Plan } from 'src/app/models/payments';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent {
  plans: Plan[] = [
    { id: 'FREE', name: 'FREE', price: '0€/month' },
    { id: 'NOBLE', name: 'NOBLE', price: '3.99€/month' },
    { id: 'KING', name: 'KING', price: '4.99€/month' }
  ];

  constructor(private paymentService: PaymentService) { }

  selectPlan(planId: string) {
    this.paymentService.createCheckoutSession(planId).subscribe(
      session => {
        // Redirige al Checkout de Stripe
        window.location.href = session.url;
      },
      error => console.error(error)
    );
  }
}
