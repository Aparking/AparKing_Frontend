import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { DataManagementService } from 'src/app/service/data-management.service';
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
    private loadingCtrl: LoadingController
  ) {}

  async logout() {
    const loading = await this.loadingCtrl.create({
      message: 'Cerrando sesión...',
    });
    loading.present();
    this.datamanagement.postLogout().then((_) => {
      this.navCtrl.navigateRoot('/');
      loading.dismiss();
    });
  }
}
