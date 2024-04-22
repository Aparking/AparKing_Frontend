import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/authentication';
import { CombinedDataPayment, Credit, Membership, Plan } from 'src/app/models/payments';
import { DataManagementService } from 'src/app/service/data-management.service';
import { PaymentService } from 'src/app/service/payment.service';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  ngOnInit() {
    this.dataManagementService.subscription();
    this.getUserInfo();
  }
  serverUrl = window.location.href;
  apiPath = '';
  path = this.serverUrl + this.apiPath;

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

  constructor(private paymentService: PaymentService, private dataManagementService: DataManagementService, private navCtrl: NavController,) { }



  async selectPlan(planId: string) {
    try {
      const session = await this.dataManagementService.createCheckoutSession(planId, this.path);
      window.location.href = session.url;
    } catch (error) {
      console.error(error);
    }
  }

  async getUserInfo() {
    this.dataManagementService.subscription().then(
      (response: { user_info: CombinedDataPayment }) => {
        this.userInfo = response.user_info;
      },
      error => {
        console.error('Error al obtener la información del usuario', error);

      }
    );
  }

  goMap() {
    this.navCtrl.navigateForward('/G11/aparKing/map');
  }
}