import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Garage, Image } from 'src/app/models/garagement';
import { RestService } from 'src/app/service/rest.service';
import { GarageBookListComponent } from '../garage-book-list/garage-book-list.component';
import { GarageDetailComponent } from '../garage-detail/garage-detail.component';

@Component({
  selector: 'app-garage-list',
  templateUrl: './garage-list.component.html',
  styleUrls: ['./garage-list.component.scss'],
})
export class GarageListComponent implements OnInit {
  component = GarageDetailComponent;

  garages!: any[];
  address!: any[];
  images!: any[];
  garage: Garage[] = [];
  image: Image[] = [];
  nameFilter: string = '';
  priceFilter!: number;
  dimensionFilter!: number;

  constructor(
    private restService: RestService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit(): void {
    this.retrieveAllGarages();
    this.getAllImages();
  }

  async openBookListModal() {
    const modal = await this.modalCtrl.create({
      component: GarageBookListComponent,
    });
    return await modal.present();
  }

  retrieveAllGarages() {
    this.restService.getAllGarages().then((garages) => {
      this.garages = garages;
    });
  }

  getImage(garage: Garage): Image | undefined {
    return this.images.find((image) => image.garageId === garage.id);
  }

  getAllImages() {
    this.restService.getAllImages().then((images) => {
      this.images = images;
    });
  }

  getAvailableGarages() {
    this.restService.getAvailableGarages().then((garages) => {
      this.garages = garages;
    });
  }

  get filteredGarages() {
    return this.garages.filter(
      (garage) =>
        garage.name.toLowerCase().includes(this.nameFilter.toLowerCase()) &&
        (!this.priceFilter || garage.price <= this.priceFilter) &&
        (!this.dimensionFilter ||
          Math.max(garage.height, garage.width, garage.length) <=
            this.dimensionFilter)
    );
  }
}
