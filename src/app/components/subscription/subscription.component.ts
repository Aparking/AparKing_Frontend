import { Component } from '@angular/core';
import { PaymentService } from 'src/app/service/payment.service';

declare var Stripe: any; // Añade esta línea si Stripe no está declarado

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
})
export class SubscriptionComponent {
  constructor(private paymentService: PaymentService) { }

  startSubscription() {
    this.paymentService.createCheckoutSession().subscribe({
      next: (session: any) => {
        // Asegúrate de usar tu clave pública de Stripe aquí
        const stripe = Stripe('pk_test_51OzOxfC4xI44aLdHvUAMGqXuLK20YmVySPMwzg1D6K5WSeSaGi1xKw8yE57CNg5hx3h6PMe6APLySRPUxvRWrMNK00kTx0DMyI');
        stripe.redirectToCheckout({
          sessionId: session.id,
        });
      },
      error: (error) => console.error(`Error: ${error}`),
    });
  }
}
