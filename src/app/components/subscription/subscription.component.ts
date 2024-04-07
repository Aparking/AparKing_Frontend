import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/authentication';
import { CombinedDataPayment, Credit, Membership, Plan } from 'src/app/models/payments';
import { PaymentService } from 'src/app/service/payment.service';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  ngOnInit() {
    console.log('login');
    this.paymentService.subscription();
    this.getUserInfo();
  }
  userInfo?: {
    'user': User,
    'membership': Membership,
    'credit': Credit
  };
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

  async getUserInfo() {
    this.paymentService.subscription().then(
      (response: { user_info: CombinedDataPayment }) => {
        this.userInfo = response.user_info;
        console.log(this.userInfo);
      },
      error => {
        console.error('Error al obtener la información del usuario', error);

      }
    );
  }


}