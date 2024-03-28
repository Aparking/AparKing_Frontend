import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

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
    private alertController: AlertController
  ) {}

  MEDIA_BASE_ULR = 'http://127.0.0.1:8000';
  base_url = '/aparKing/garages';
  garageId: string = '';
  currentGarage?: any;
  currentGarageImages: any[] = [];

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      if (id) this.garageId = id;
      else {
        console.error('No id provided');
        this.router.navigate([`${this.base_url}/${this.garageId}`]);
      }
    });
    this.retrieveGarage();
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

    this.restService.getImageByGarageId(this.garageId).then((images) => {
      this.currentGarageImages = images;
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
        this.router.navigate([this.base_url]);
      })
      .catch((error) => {
        console.error(error);
        this.router.navigate([`${this.base_url}/${this.garageId}`]);
      });
  }
}
