import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { RestService } from 'src/app/service/rest.service';
import { environment } from 'src/environments/environment';

import { GarageAvailabilityListCreateComponent } from '../garage-availability-list-create/garage-availability-list-create.component';
import { GarageBookCreateComponent } from '../garage-book-create/garage-book-create.component';

@Component({
  selector: 'app-garage-detail',
  templateUrl: './garage-detail.component.html',
  styleUrls: ['./garage-detail.component.scss'],
})
export class GarageDetailComponent implements OnInit {
  constructor(
    private restService: RestService,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private modalCtrl: ModalController
  ) {}

  MEDIA_BASE_ULR = environment.restUrl;
  base_url = '/G11/aparKing/garages';
  garageId: string = '';
  currentGarage?: any;
  currentGarageImages: any[] = [];
  isOwner: boolean = false;

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      if (id) this.garageId = id;
      else {
        console.error('No id provided');
        this.router.navigate([`${this.base_url}`]);
      }
    });
    this.retrieveGarage();
    this.checkIsOwner();
  }

  retrieveGarage() {
    this.restService
      .getGarageById(this.garageId)
      .then((garage) => {
        this.currentGarage = garage;
      })
      .catch((error) => {
        console.error(error);
        this.router.navigate([`${this.base_url}/${this.garageId}`]);
      });

    this.restService.getImagesByGarageId(this.garageId).then((images) => {
      this.currentGarageImages = images;
    });
  }

  checkIsOwner() {
    this.restService
      .getUserData()
      .then((user) => {
        if (user.id === this.currentGarage.owner) {
          this.isOwner = true;
        }
      })
      .catch((error) => {
        console.error(error);
        this.router.navigate([`${this.base_url}`]);
      });
  }

  toggleGarageStatus() {
    if (this.currentGarage) {
      this.currentGarage.is_active = !this.currentGarage.is_active;
      this.restService
        .updateGarage(this.garageId, this.currentGarage)
        .then(() => {
          this.retrieveGarage();
        })
        .catch((error) => {
          console.error(error);
          this.router.navigate([`${this.base_url}/${this.garageId}`]);
        });
    }
  }

  async alertDeleteConfirmation() {
    const alert = await this.alertController.create({
      header: 'Borrado de garaje',
      message: '¿Estás seguro de que quieres borrar el garaje?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.deleteGarage();
          },
        },
      ],
    });

    await alert.present();
  }

  showUpdateGarage() {
    this.router.navigate([`${this.base_url}/${this.garageId}/edit`]);
  }

  deleteGarage() {
    this.restService
      .deleteGarage(this.garageId)
      .then(() => {
        this.router.navigate(['/G11/aparKing/garages']);
      })
      .catch((error) => {
        console.error(error);
        this.router.navigate([`${this.base_url}/${this.garageId}`]);
      });
  }

  goBack() {
    this.router.navigate(['/G11/aparKing/garages']);
  }

  async createAvailabilityModal() {
    const modal = await this.modalCtrl.create({
      component: GarageAvailabilityListCreateComponent,
      componentProps: {
        garageId: this.garageId,
        currentGarage: this.currentGarage,
      },
    });
    return await modal.present();
  }

  async createBookModal() {
    const modal = await this.modalCtrl.create({
      component: GarageBookCreateComponent,
      componentProps: {
        garageId: this.garageId,
        currentGarage: this.currentGarage,
      },
    });
    return await modal.present();
  }
}
