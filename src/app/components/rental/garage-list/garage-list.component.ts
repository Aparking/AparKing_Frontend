import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { MembershipType } from 'src/app/models/payments';
import { DataManagementService } from 'src/app/service/data-management.service';
import { GarageStateService } from 'src/app/service/garage-state.service';
import { RestService } from 'src/app/service/rest.service';
import { environment } from 'src/environments/environment';
import { GarageBookListComponent } from '../garage-book-list/garage-book-list.component';
import { GarageDetailComponent } from '../garage-detail/garage-detail.component';
import { MyGaragesComponent } from '../my-garages/my-garages.component';


@Component({
  selector: 'app-garage-list',
  templateUrl: './garage-list.component.html',
  styleUrls: ['./garage-list.component.scss'],
})
export class GarageListComponent implements OnInit {
  component = GarageDetailComponent;
  userInfo: any | null;
  garages: any[] = [];
  _filterTitle: string = '';
  _filterPriceMin: number = 0;
  _filterPriceMax: number = 0;
  _filterDimensionMin: number = 0;
  _filterCity: string = '';
  _filterMyGarages: boolean = false;
  filteredGarages!: any[];
  currentUserGarages!: any[];

  get filterTitle() {
    return this._filterTitle;
  }
  set filterTitle(value: string) {
    this._filterTitle = value;
    this.applyFilters();
  }

  get filterPriceMin() {
    return this._filterPriceMin;
  }
  set filterPriceMin(value: number) {
    this._filterPriceMin = value;
    this.applyFilters();
  }

  get filterPriceMax() {
    return this._filterPriceMax;
  }
  set filterPriceMax(value: number) {
    this._filterPriceMax = value;
    this.applyFilters();
  }

  get filterDimensionMin() {
    return this._filterDimensionMin;
  }
  set filterDimensionMin(value: number) {
    this._filterDimensionMin = value;
    this.applyFilters();
  }

  get filterMyGarages() {
    return this._filterMyGarages;
  }
  set filterMyGarages(value: boolean) {
    this._filterMyGarages = value;
    this.applyFilters();
  }

  get filterCity() {
    return this._filterCity;
  }
  set filterCity(value: string) {
    this._filterCity = value;
    this.applyFilters();
  }

  constructor(
    private restService: RestService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private garageStateService: GarageStateService,
    private dataManagementService: DataManagementService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.currentUserGarages = [];

    this.garageStateService.garages$.subscribe((garages) => {
      this.garages = garages.map((garage) => {
        return {
          id: garage.id,
          title: garage.name,
          description: garage.description,
          address: `${garage.address.street_number}, ${garage.address.address_line}, ${garage.address.city}`,
          city: garage.address.city,
          price: garage.price,
          dimensionsText: `${garage.width * garage.height * garage.length} m³`,
          dimensionsNumber: garage.width * garage.height * garage.length,
          mygarage: this.currentUserGarages.includes(garage.id),
        };
      });

      this.filteredGarages = this.garages;

    });
    this.restService.getMyGarages().then(garages => {
      this.currentUserGarages = garages.map(garage => garage.id);
      console.log("hola")
      this.garageStateService.refreshGarages();
      this.hasGarages();
    }).catch(async error => { });
    this.garageStateService.refreshGarages();
    this.loadGaragesImages();
    this.hasGarages();
  }

  async loadGaragesImages() {
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

  applyFilters() {
    this.filteredGarages = this.filterGarages(
      this.filterTitle,
      this.filterPriceMin,
      this.filterPriceMax,
      this.filterDimensionMin,
      this.filterCity,
      this.filterMyGarages
    );
  }

  filterGarages(
    title: string,
    priceMin: number = 0,
    priceMax: number = 0,
    dimensionMin: number = 0,
    city: string = '',
    myGarages: boolean = false
  ) {
    return this.garages.filter(
      (garage) =>
        (!title || garage.title.toLowerCase().includes(title.toLowerCase())) &&
        (!priceMin || Number(garage.price) >= priceMin) &&
        (!priceMax || Number(garage.price) <= priceMax) &&
        (!dimensionMin || garage.dimensionsNumber >= dimensionMin) &&
        (!city || garage.city.toLowerCase().includes(city.toLowerCase())) &&
        (!myGarages || this.currentUserGarages.includes(garage.id))
    );
  }

  hasGarages(): boolean {
    return this.currentUserGarages && this.currentUserGarages.length > 0;
  }

  // MODALS AND OTHER COMPONENTS

  async openBookListModal() {
    const modal = await this.modalCtrl.create({
      component: GarageBookListComponent,
    });
    return await modal.present();
  }

  async openMyGarageDetailModal(garage: any) {
    const modal = await this.modalCtrl.create({
      component: GarageDetailComponent,
      componentProps: {
        garage: garage,
      },
    });
    return await modal.present();
  }

  async openMyGaragesModal() {
    const modal = await this.modalCtrl.create({
      component: MyGaragesComponent,
    });
    return await modal.present();
  }

  async navigateToCreateGarage() {
    await this.dataManagementService
      .subscription()
      .then((data) => {
        this.userInfo = data.user_info;
      })
      .catch((_) => {
        this.userInfo = null;
      });

    if (!this.userInfo) {
      const alert = await this.alertController.create({
        header: 'No puedes crear garajes',
        message:
          'Para poder crear garajes necesitas tener una suscripción activa',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    } else {
      let myGarages = await this.restService
        .getMyGarages()
        .then((data) => {
          return data.length;
        })
        .catch((_) => 0);

      if (
        (this.userInfo.membership.type === MembershipType.FREE &&
          myGarages + 1 > 1) ||
        (this.userInfo.membership.type === MembershipType.NOBLE &&
          myGarages + 1 > 3) ||
        (this.userInfo.membership.type === MembershipType.KING &&
          myGarages + 1 > 5)
      ) {
        const alert = await this.alertController.create({
          header: 'No puedes crear más garajes',
          message:
            'Has alcanzado el límite de garajes que puedes crear con tu suscripción',
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }
      this.navCtrl.navigateForward('/G11/aparKing/garages/create');
    }
  }
}
