import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
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
  garages: any[] = [];
  _filterTitle: string = '';
  _filterPriceMin: number = 0;
  _filterPriceMax: number = 0;
  _filterDimensionMin: number = 0;
  _filterCity: string = '';
  filteredGarages!: any[];
  currentUserGarages!: any[];

  get filterTitle() {
    return this._filterTitle;
  }
  set filterTitle(value: string) {
    this._filterTitle = value;
    this.filteredGarages = this.filterGarages(
      value,
      this.filterPriceMin,
      this.filterPriceMax,
      this.filterDimensionMin,
      this.filterCity
    );
  }

  get filterPriceMin() {
    return this._filterPriceMin;
  }
  set filterPriceMin(value: number) {
    this._filterPriceMin = value;
    this.filteredGarages = this.filterGarages(
      this.filterTitle,
      value,
      this.filterPriceMax,
      this.filterDimensionMin,
      this.filterCity
    );
  }

  get filterPriceMax() {
    return this._filterPriceMax;
  }
  set filterPriceMax(value: number) {
    this._filterPriceMax = value;
    this.filteredGarages = this.filterGarages(
      this.filterTitle,
      this.filterPriceMin,
      value,
      this.filterDimensionMin,
      this.filterCity
    );
  }

  get filterDimensionMin() {
    return this._filterDimensionMin;
  }
  set filterDimensionMin(value: number) {
    this._filterDimensionMin = value;
    this.filteredGarages = this.filterGarages(
      this.filterTitle,
      this.filterPriceMin,
      this.filterPriceMax,
      value,
      this.filterCity
    );
  }

  get filterCity() {
    return this._filterCity;
  }
  set filterCity(value: string) {
    this._filterCity = value;
    this.filteredGarages = this.filterGarages(
      this.filterTitle,
      this.filterPriceMin,
      this.filterPriceMax,
      this.filterDimensionMin,
      value
    );
  }

  constructor(
    private restService: RestService,
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private garageStateService: GarageStateService
  ) {}

  ngOnInit() {
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
        };
      });
      this.loadGaragesImages();
      this.filteredGarages = this.garages;
    });
    this.garageStateService.refreshGarages();
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

  filterGarages(
    title: string,
    priceMin: number = 0,
    priceMax: number = 0,
    dimensionMin: number = 0,
    city: string = ''
  ) {
    return this.garages.filter(
      (garage) =>
        (!title || garage.title.toLowerCase().includes(title.toLowerCase())) &&
        (!priceMin || Number(garage.price) >= priceMin) &&
        (!priceMax || Number(garage.price) <= priceMax) &&
        (!dimensionMin || garage.dimensionsNumber >= dimensionMin) &&
        (!city || garage.city.toLowerCase().includes(city.toLowerCase()))
    );
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


  navigateToCreateGarage() {
    this.navCtrl.navigateForward('/G11/aparKing/garages/create');
  }
}
