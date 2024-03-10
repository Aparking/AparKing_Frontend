import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GarageListComponent } from '../components/rental/garage-list/garage-list.component';
import { MyGaragesComponent } from '../components/rental/my-garages/my-garages.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private modalController: ModalController) { }

  async presentModal() {
    const modal = await this.modalController.create({
      component: GarageListComponent
    });
    return await modal.present();
  }

  async presentMyGaragesModal() {
    const modal = await this.modalController.create({
      component: MyGaragesComponent,
      cssClass: 'custom-modal'
    });
    return await modal.present();
  }
}
