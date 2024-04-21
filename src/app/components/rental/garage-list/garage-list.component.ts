import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Garage } from 'src/app/models/garagement';
import { RestService } from 'src/app/service/rest.service';
import { environment } from 'src/environments/environment';
import { GarageBookListComponent } from '../garage-book-list/garage-book-list.component';
import { GarageDetailComponent } from '../garage-detail/garage-detail.component';

@Component({
  selector: 'app-garage-list',
  templateUrl: './garage-list.component.html',
  styleUrls: ['./garage-list.component.scss'],
})
export class GarageListComponent implements OnInit {
  component = GarageDetailComponent;
  garages: any[] = [];

  constructor(
    private restService: RestService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit(): Promise<void> {
    await this.restService
      .getAllGarages()
      .then((data: Garage[]) => {
        data.forEach((garage) => {
          this.garages.push({
            id: garage.id,
            title: garage.name,
            description: garage.description,
            address: `${garage.address.street_number}, ${garage.address.address_line}, ${garage.address.city}`,
            price: garage.price,
          });
        });
      })
      .catch((_) => this.showAlert('No se encontraron garajes.'));

    const garageImagePromise = this.garages.map(async (garage) => {
      return await this.restService
        .getImagesByGarageId(garage.id)
        .then((images) => {
          garage.image = `${environment.restUrl}${images[0].image}`;
        })
        .catch((_) => {
          garage.image =
            'https://ionicframework.com/docs/img/demos/card-media.png';
        });
    });

    await Promise.all(garageImagePromise);
  }

  async showAlert(text: string) {
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      message: text,
      buttons: ['OK'],
    });
    await alert.present();
  }

  // MODALS AND OTHER COMPONENTS

  async openBookListModal() {
    const modal = await this.modalCtrl.create({
      component: GarageBookListComponent,
    });
    return await modal.present();
  }
}
