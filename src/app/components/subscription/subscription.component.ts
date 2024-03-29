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
    { id: 'plan_basic', name: 'Basic Plan', price: '$10/month' },
    { id: 'plan_pro', name: 'Pro Plan', price: '$20/month' },
    { id: 'plan_premium', name: 'Premium Plan', price: '$30/month' }
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
