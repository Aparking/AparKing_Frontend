import { Component } from '@angular/core';
import { PaymentService } from 'src/app/service/payment.service';

declare var Stripe: any; // Añade esta línea si Stripe no está declarado

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent {
  constructor(private paymentService: PaymentService) {}

  startSubscription() {
    this.paymentService.createCheckoutSession().subscribe({
      next: (session: any) => {
        // Asegúrate de usar tu clave pública de Stripe aquí
        const stripe = Stripe('pk_test_51OwKuxRoKCd4QwqUa8Fv4PIAVlrcEwwQKf4zoBfOxszZXupO2BAkXINGo8uTNg9tuUhlMMFEX9pT5yciXPy9avCg00LhG7EXka');
        stripe.redirectToCheckout({
          sessionId: session.id,
        });
      },
      error: (error) => console.error(`Error: ${error}`),
    });
  }
}
