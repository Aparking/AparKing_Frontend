import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { DataManagementService } from 'src/app/service/data-management.service';
import { WebsocketService } from 'src/app/service/websocket.service';
import { constants } from './../constants.ts';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constants = constants;

  constructor(
    private navCtrl: NavController,
    private datamanagement: DataManagementService,
    private loadingCtrl: LoadingController,
    private wsService: WebsocketService
  ) { }

  async logout() {
    const loading = await this.loadingCtrl.create({
      message: 'Cerrando sesión...',
    });
    await this.wsService.disconnect();
    loading.present();
    this.datamanagement.postLogout().then((_) => {
      this.navCtrl.navigateRoot('/');
      loading.dismiss();
    });
  }

  async goToCesion() {
    this.navCtrl.navigateRoot('G11/aparKing/list-parking-cesion');
  }

}

