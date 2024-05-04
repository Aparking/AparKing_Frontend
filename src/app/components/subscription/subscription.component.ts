import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { User } from 'src/app/models/authentication';
import {
  CombinedDataPayment,
  Credit,
  Membership,
  Plan,
} from 'src/app/models/payments';
import { DataManagementService } from 'src/app/service/data-management.service';
import { PaymentService } from 'src/app/service/payment.service';
import { RestService } from 'src/app/service/rest.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
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
    user: User;
    membership: Membership;
    credit: Credit;
  };
  plans: Plan[] = [
    { id: 'FREE', name: 'FREE', price: '0€/month' },
    { id: 'NOBLE', name: 'NOBLE', price: '3.99€/month' },
    { id: 'KING', name: 'KING', price: '4.99€/month' },
  ];

  constructor(
    private paymentService: PaymentService,
    private dataManagementService: DataManagementService,
    private navCtrl: NavController,
    private restService: RestService,
    private alertController: AlertController
  ) {}

  async selectPlan(planId: string) {
    try {
      const session = await this.dataManagementService.createCheckoutSession(
        planId,
        this.path
      );
      window.location.href = session.url;
    } catch (error) {
      console.error(error);
    }
    await this.updateUserGaragesWithPlan(planId);
  }

  async getUserInfo() {
    this.dataManagementService.subscription().then(
      (response: { user_info: CombinedDataPayment }) => {
        this.userInfo = response.user_info;
      },
      (error) => {
        console.error('Error al obtener la información del usuario', error);
      }
    );
  }

  goMap() {
    this.navCtrl.navigateForward('/G11/aparKing/map');
  }

  async updateUserGaragesWithPlan(planId: string) {
    const userGarages = await this.restService
      .getMyGarages()
      .then((data) => data)
      .catch((_) => []);
    const nGarages = userGarages.length;

    // if planId === 'FREE'
    let garagesLimit = 1;
    if (planId === 'NOBLE') {
      garagesLimit = 3;
    } else if (planId === 'KING') {
      garagesLimit = 5;
    }

    if (nGarages > garagesLimit) {
      // sort by creation_date reversed (new first)
      userGarages.sort((a, b) => {
        const dateA = new Date(a.creation_date);
        const dateB = new Date(b.creation_date);
        return dateB.getTime() - dateA.getTime();
      });

      while (userGarages.length > garagesLimit) {
        const garage = userGarages.pop();
        try {
          if (garage) {
            await this.restService.deleteGarage(garage.id);
          } else {
            throw new Error('Error al obtener el garaje');
          }
        } catch (error) {
          console.error(error);
        }
      }

      const alert = await this.alertController.create({
        header: 'Actualización de garajes',
        message:
          'Has superado el límite de garajes permitidos por el plan seleccionado. Se han conservado los últimos garajes creados permitidos por el nuevo plan seleccionado.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
