import { Component } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { DataManagementService } from 'src/app/service/data-management.service';
import { register } from 'swiper/element/bundle';
import { GarageListComponent } from '../components/rental/garage-list/garage-list.component';
import { constants } from './../constants.ts';

register();

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  component = GarageListComponent;
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
