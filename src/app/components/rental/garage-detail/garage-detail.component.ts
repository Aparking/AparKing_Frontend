import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { RestService } from 'src/app/service/rest.service';
import { environment } from 'src/environments/environment';

import { GarageStateService } from 'src/app/service/garage-state.service';
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
    private modalCtrl: ModalController,
    private garageStateService: GarageStateService,
    private navCtr: NavController,
  ) { }

  MEDIA_BASE_ULR = environment.restUrl;
  base_url = '/G11/aparKing/garages';
  garageId: string = '';
  isOwner: boolean = false;
  currentGarage?: any;
  currentGarageImages: any[] = [];

  async ngOnInit() {
    await this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      if (id) this.garageId = id;
      else {
        this.showAlert('No se ha encontrado el garaje.');
        this.router.navigate([`${this.base_url}`]);
      }
    });
    await this.retrieveGarage();
    await this.checkIsOwner();
  }

  async showAlert(text: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: text,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async retrieveGarage() {
    await this.restService
      .getGarageById(this.garageId)
      .then((garage) => {
        this.currentGarage = garage;
      })
      .catch((_) => {
        this.showAlert('No se ha encontrado el garaje.');
        this.router.navigate([`${this.base_url}/${this.garageId}`]);
      });

    await this.restService.getImagesByGarageId(this.garageId).then((images) => {
      this.currentGarageImages = images;
    });
  }

  async checkIsOwner() {
    await this.restService
      .getUserData()
      .then((user) => {
        if (user.id === this.currentGarage.owner) {
          this.isOwner = true;
        }
      })
      .catch((_) => {
        this.showAlert('No se ha encontrado el usuario.');
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
          this.showAlert('No se ha podido actualizar el estado del garaje.');
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
        this.garageStateService.refreshGarages();
        this.navCtr.navigateBack('G11/aparKing/garages').then(() => {
          window.location.reload();
        });
      })
      .catch((_) => {
        this.showAlert('No se ha podido borrar el garaje.');
        this.garageStateService.refreshGarages();
        this.router.navigate([`${this.base_url}/${this.garageId}`]);
      });
  }

  goBack() {
    this.garageStateService.refreshGarages();
    this.router.navigate([this.base_url]);
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

  async checkBookingConditions() {
    let availabilityExist = false;
    this.restService
      .getAvailabilitiesByGarageId(this.garageId)
      .then((availabilities) => {
        availabilityExist = availabilities.some(
          (availability) => availability.status === 'AVAILABLE'
        );
        if (availabilityExist) {
          this.createBookingModal();
        } else {
          this.showAlert('No hay disponibilidad para reservar el garaje.');
        }
      });
  }

  async createBookingModal() {
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
